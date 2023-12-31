import {
  Alert,
  Button,
  Fieldset,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const redirect = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const { signup, logout, currentUser } = useAuth();

  async function handleSubmit() {
    setLoading(true);
    if (passwordRef.current!.value !== confirmPasswordRef.current!.value) {
      setLoading(false);
      setConfirmError(true);
      return;
    }

    try {
      await signup!(emailRef.current!.value, passwordRef.current!.value);
      redirect("/");
    } catch (error: any) {
      setError("Failed to create an account");
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
      <h1>Sign up</h1>
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
          <PasswordInput
            label="Confirm password"
            placeholder="Re-type password"
            withAsterisk
            ref={confirmPasswordRef}
            error={confirmError ? "Passwords do not match" : null}
          />
          <br />
          {error && (
            <>
              <Alert color="red" title={error} /> <br />
            </>
          )}
          <Button onClick={handleSubmit} disabled={loading}>
            Submit
          </Button>
          <h5>
            Already registered? <Link to="/signin">Sign in</Link>
          </h5>
        </>
      )}
    </Fieldset>
  );
}
