import { useAuth } from "../../contexts/authContext";
import { Button, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import ProfileButton from "./ProfileButton";

export default function ProfileCicleOrLinks({
  modalType,
}: {
  modalType?: boolean;
}) {
  let { currentUser } = useAuth();

  return !currentUser ? (
    modalType ? (
      <Group mr="xl">
        <Signin modalType={true} />
        <Signup modalType={true} />
      </Group>
    ) : (
      <Group mr="xl">
        <Button color="blue" component={Link} to="/signin">
          Login
        </Button>
        <Button variant="outline" color="blue" component={Link} to="/signup">
          Register
        </Button>
      </Group>
    )
  ) : (
    <ProfileButton modalType={modalType} />
  );
}
