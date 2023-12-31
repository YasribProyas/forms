import {
  Alert,
  Button,
  Fieldset,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";

export default function Signup() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { signin, currentUser, logout } = useAuth();

  async function handleSubmit() {
    setLoading(true);
    if (passwordRef.current == null) {
      setLoading(false);
      return setError("Passwords cant be empty");
    }

    try {
      await signin!(emailRef.current!.value, passwordRef.current!.value);
    } catch (error: any) {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  function handleSignout() {
    try {
      logout?.();
    } catch (error) {
      console.log("Logout error:", error);
    }
  }

  return (
    <Fieldset variant="filled">
      <h1>Sign in</h1>
      {currentUser ? (
        <Alert color="yellow">
          You are already logged in as {currentUser!.email}
          <p>You must log out first to signin</p>
          <Group>
            <Button component={Link} to="/">
              Cancel
            </Button>
            <Button variant="outline" color="orange" onClick={handleSignout}>
              Log out
            </Button>
          </Group>
        </Alert>
      ) : (
        <>
          <TextInput
            type="email"
            label="Email"
            placeholder="example@email.com"
            withAsterisk
            ref={emailRef}
          />
          <PasswordInput
            label="Password"
            placeholder="password"
            withAsterisk
            ref={passwordRef}
          />
          {error && (
            <>
              <Alert color="red" title={error} /> <br />
            </>
          )}
          <br />
          <Button onClick={handleSubmit} disabled={loading}>
            Submit
          </Button>
          <h5>
            Not registered? <Link to="/signup">Sign up</Link>
          </h5>
        </>
      )}
    </Fieldset>
  );
}
