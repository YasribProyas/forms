import { useAuth } from "../contexts/authContext";
import { Avatar, Button, Center, Group, Menu, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export default function ProfileCicleOrLinks() {
  let { currentUser, logout } = useAuth();

  function handleSignout() {
    try {
      logout?.();
    } catch (error) {
      console.log("Logout error:", error);
    }
  }

  return !currentUser ? (
    <Group mr="xl">
      <Button color="blue" component={Link} to="/signin">
        Login
      </Button>
      <Button variant="outline" color="blue" component={Link} to="/signup">
        Register
      </Button>
    </Group>
  ) : (
    <Group mr="xl">
      <Menu shadow="md" width={250}>
        <Menu.Target>
          <Avatar size="lg" radius="xl" component="button" />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Profile</Menu.Label>
          <Center>
            <Avatar size="xl" radius="xl" component="button" ta={Center} />
          </Center>
          <Text ta="center">{currentUser.email}</Text>

          <Menu.Divider />

          <Menu.Label>Account</Menu.Label>
          <Menu.Item component={Link} to="/update-profile">
            Settings
          </Menu.Item>
          <Menu.Item color="red" onClick={handleSignout}>
            Sign out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
