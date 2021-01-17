import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
  // create an authentication link
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from localStorage if in exists
    // sessionStorage vs localStorage
    const token = sessionStorage.getItem("token");

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const httpLink = new HttpLink({
    uri: "/graphql",
    credentials: "include",
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

// initialize apollo client with context and initial state
export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // initial apollo client state gets re-hydrated hare
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // for SSR or SSG always create a new Apollo Client
  if (typeof window === "undefined") {
    return _apolloClient;
  }

  // create the apollo client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
