import {
  Alert,
  Button,
  Fieldset,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/authContext";

export default function Signup() {
  const [error, setError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const { signup, currentUser } = useAuth();

  async function handleSubmit() {
    setLoading(true);
    if (passwordRef.current!.value !== confirmPasswordRef.current!.value) {
      setLoading(false);
      return setError("Passwords do not match");
    }

    try {
      await signup!(emailRef.current!.value, passwordRef.current!.value);
    } catch (error: any) {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <Fieldset legend="Login" variant="filled">
      <Alert color="green">Logged in as {currentUser!.email}</Alert>
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
      {error && <Alert color="red" title={error} />}
      <br />
      <Button onClick={handleSubmit} disabled={loading}>
        Submit
      </Button>
    </Fieldset>
  );
}
