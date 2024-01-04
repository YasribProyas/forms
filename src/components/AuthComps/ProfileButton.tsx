import { Avatar, Center, Menu, Modal, Text } from "@mantine/core";
import { useAuth } from "../../contexts/authContext";
import UpdateProfile from "./UpdateProfile";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

export default function ProfileButton({ modalType }: { modalType?: boolean }) {
  let { currentUser, logout } = useAuth();
  const [settingsOpened, { open: openSettings, close: closeSettings }] =
    useDisclosure(false);

  function handleSignout() {
    try {
      logout?.();
    } catch (error) {
      console.log("Logout error:", error);
    }
  }
  return (
    <Menu shadow="md" width={250} withArrow position="left-start">
      <Modal opened={settingsOpened} onClose={closeSettings}>
        <UpdateProfile />
      </Modal>
      <Menu.Target>
        <Avatar size="lg" radius="xl" component="button" mr="xl" />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Profile</Menu.Label>
        <Center>
          <Avatar size="xl" radius="xl" component="button" ta={Center} m="xs" />
        </Center>
        <Text ta="center">{currentUser?.displayName}</Text>

        <Menu.Divider />

        <Menu.Label>Account</Menu.Label>
        {modalType ? (
          <Menu.Item onClick={openSettings}>Settings</Menu.Item>
        ) : (
          <Menu.Item component={Link} to="/update-profile">
            Settings
          </Menu.Item>
        )}
        <Menu.Item color="red" onClick={handleSignout}>
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
