import { useState } from "react";
import {
  Typography,
  Container,
  TextField,
  Box,
  Button,
} from "@material-ui/core";
import { useAuth } from "lib/useAuth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, signIn } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();
    signIn(email, password);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <form onSubmit={onSubmit}>
          {error && <p>{error}</p>}
          <Typography variant="h4">Sign In</Typography>
          <Box pb={2.5} />
          <TextField
            className="form-control"
            label="Ëmail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <Box pb={2.5} />
          <TextField
            className="form-control"
            type="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <Box pb={2.5} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
}
