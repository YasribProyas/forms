import { AppShell, Avatar, Button, Group, TextInput } from "@mantine/core";
import React from "react";
import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";

export default function UpdateProfile() {
  const { currentUser } = useAuth();

  return (
    <AppShell.Section>
      <h1>Update Profile</h1>
      <Avatar size="lg" />

      <TextInput
        label="Username"
        placeholder={currentUser?.displayName || "Not found"}
      />
      <TextInput
        label="Email"
        placeholder={currentUser?.email || "Not found"}
      />

      <br />
      <Link target="_blank" to="/reset-password">
        Reset Password
      </Link>
      <br />
      <br />
      <Button disabled={true}>Update Profile</Button>
    </AppShell.Section>
  );
}
