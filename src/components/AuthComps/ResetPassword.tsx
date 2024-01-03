import {
  Alert,
  Button,
  Fieldset,
  LoadingOverlay,
  TextInput,
} from "@mantine/core";
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { AuthError } from "firebase/auth";

export default function ResetPassword() {
  const resetEmailRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [otherError, setOtherError] = useState<string | null>(null);

  const [emailSent, setEmailSent] = useState<boolean>(false);

  const { currentUser, resetPassword } = useAuth();

  async function handleResetPassword() {
    setEmailError(null);
    setOtherError(null);
    setLoading(true);
    if (resetEmailRef.current) {
      try {
        await resetPassword!(resetEmailRef.current.value);
        setEmailSent(true);
      } catch (error) {
        if ((error as AuthError).code === "auth/user-not-found") {
          setEmailError("No user found with this email");
        } else {
          setOtherError(
            (error as AuthError).code.split("/")[1].replaceAll("-", " ")
          );
        }
      }
    }
    setLoading(false);
  }

  return (
    <Fieldset variant="filled">
      <LoadingOverlay visible={loading} />
      {!emailSent ? (
        <>
          <h1>Reset password</h1>
          <p>Enter your email to reset your password</p>
          <TextInput
            label="Email"
            type="email"
            value={currentUser?.email || ""}
            placeholder="Your email"
            ref={resetEmailRef}
            error={emailError}
          />
          {otherError && (
            <>
              <br />
              <Alert color="red">{otherError}</Alert>
            </>
          )}
          <br />
          <Button onClick={handleResetPassword}>Send email</Button>
        </>
      ) : (
        <Alert color="cyan">
          Reset email sent. Please check your email and reset your password from
          the link given in the email
        </Alert>
      )}
    </Fieldset>
  );
}
