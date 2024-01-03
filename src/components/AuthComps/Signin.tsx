import {
  Text,
  Alert,
  Button,
  Fieldset,
  Group,
  PasswordInput,
  TextInput,
  Modal,
} from "@mantine/core";
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

export default function Signup({ modalType }: { modalType?: boolean }) {
  const redirect = useNavigate();

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
      redirect("/");
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

  function SingninFieldset() {
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
            <Text c="gray" my="sm">
              Forgot password? <Link to="/reset-password">Reset password</Link>
            </Text>
            <Button onClick={handleSubmit} disabled={loading}>
              Login
            </Button>
            <h5>
              Not registered? <Link to="/signup">Sign up</Link>
            </h5>
          </>
        )}
      </Fieldset>
    );
  }
  function SingninModal() {
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Button color="blue" onClick={open}>
          Sign in
        </Button>
        <Modal opened={opened} onClose={close}>
          <SingninFieldset />
        </Modal>
      </>
    );
  }

  return modalType ? <SingninModal /> : <SingninFieldset />;
}
