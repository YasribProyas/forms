import "@mantine/core/styles.css";
import { AppShell, MantineProvider } from "@mantine/core";
import { theme } from "../theme";

import { BrowserRouter, Route } from "react-router-dom";

import AuthProvider from "../contexts/authContext";
import Signup from "./Signup";

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
              <h1>Form</h1>
            </AppShell.Header>

            {/* <AppShell.Navbar>
            <h3>Yo yo chiki chiki</h3>
          </AppShell.Navbar> */}

            <AppShell.Main>
              <AppShell.Section>
                <Route path="/signup" Component={Signup} />
              </AppShell.Section>
            </AppShell.Main>
          </AuthProvider>
        </BrowserRouter>
      </AppShell>
    </MantineProvider>
  );
}
