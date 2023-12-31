import {
  Alert,
  AppShell,
  Avatar,
  Button,
  Group,
  LoadingOverlay,
  TextInput,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";
import { useInputState } from "@mantine/hooks";
import UserAuthenticationButtons from "./UserAuthenticationButtons";

export default function UpdateProfile() {
  const { currentUser, changeEmail } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [updateSuccessful, setUpdateSuccessful] = useState<boolean | null>(
    null
  );

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
    if (editedEmail) {
      promises.push(changeEmail!(editedEmail));
    }

    try {
      await Promise.all(promises);
      setUpdateSuccessful(true);
    } catch (err) {
      setUpdateSuccessful(true);
      console.error(err);
    }
    setLoading(false);
  }

  return currentUser ? (
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
      {updateSuccessful == false && (
        <Alert color="red" mb="lg">
          Failed to update profile. Please try again.
        </Alert>
      )}
      <Group>
        <Button disabled={!updatable} onClick={handleProfileUpdate}>
          Update Profile
        </Button>
        <Button component={Link} variant="light" to="/">
          cancel
        </Button>
      </Group>
    </AppShell.Section>
  ) : (
    <Alert color="yellow">
      <Text>
        You are currently not logged in. You must login before updating your
        profile
      </Text>
      <br />
      <UserAuthenticationButtons />
    </Alert>
  );
}
