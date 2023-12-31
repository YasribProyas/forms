import {
  Alert,
  AppShell,
  Avatar,
  Button,
  Group,
  LoadingOverlay,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";
import { useInputState } from "@mantine/hooks";

export default function UpdateProfile() {
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const [editedName, setEditedName] = useInputState("");
  const [editedEmail, setEditedEmail] = useInputState("");

  const [updatable, setUpdatable] = useState(false);
  useEffect(() => {
    if (editedName || editedEmail) {
      setUpdatable(true);
    } else {
      setUpdatable(false);
    }
  }, [editedName, editedEmail]);

  async function handleProfileUpdate() {
    setLoading(true);
    const promises = [];
    if (editedName) {
      // promises.push(currentUser?.updateProfile({ displayName: editedName }));
    }
  }

  return (
    <AppShell.Section>
      <LoadingOverlay visible={loading} />
      <h1>Update Profile</h1>

      <Avatar size="lg" />

      <TextInput
        label="Name"
        placeholder={currentUser?.displayName || "Not found"}
        onChange={setEditedName}
      />
      <TextInput
        label="Email"
        type="email"
        placeholder={currentUser?.email || "Not found"}
        onChange={setEditedEmail}
      />

      <br />
      <Link target="_blank" to="/reset-password">
        Reset Password
      </Link>
      <br />
      <br />
      <Alert color="yellow" mb="lg">
        Leave blank to keep it same
      </Alert>
      <Group>
        <Button disabled={!updatable} onClick={handleProfileUpdate}>
          Update Profile
        </Button>
        <Button component={Link} variant="light" to="/">
          cancel
        </Button>
      </Group>
    </AppShell.Section>
  );
}
