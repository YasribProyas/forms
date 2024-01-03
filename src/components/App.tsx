import "@mantine/core/styles.css";
import { AppShell, Flex, MantineProvider } from "@mantine/core";
import { theme } from "../theme";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AuthProvider from "../contexts/authContext";
import Signup from "./AuthComps/Signup";
import Signin from "./AuthComps/Signin";
import ProfileCicleOrLinks from "./AuthComps/UserAuthenticationButtons";
import ResetPassword from "./AuthComps/ResetPassword";
import UpdateProfile from "./AuthComps/UpdateProfile";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 90 }}
        padding={"md"}
        // navbar={{ breakpoint: "sm", width: 250 }}
      >
        <BrowserRouter>
          <AuthProvider>
            <AppShell.Header pl="xl">
              <Flex justify="space-between">
                <Link
                  to="/"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <h1>Form</h1>
                </Link>
                <ProfileCicleOrLinks />
              </Flex>
            </AppShell.Header>

            {/* <AppShell.Navbar>
            <h3>Yo yo chiki chiki</h3>
          </AppShell.Navbar> */}

            <AppShell.Main>
              <Routes>
                <Route path="/signup" Component={Signup} />
                <Route path="/signin" Component={Signin} />
                <Route path="/reset-password" Component={ResetPassword} />
                <Route path="/update-profile" Component={UpdateProfile} />
              </Routes>
            </AppShell.Main>
          </AuthProvider>
        </BrowserRouter>
      </AppShell>
    </MantineProvider>
  );
}
