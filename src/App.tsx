import "@mantine/core/styles.css";
import { AppShell, Input, MantineProvider } from "@mantine/core";
import { theme } from "./theme";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 90 }}
        padding={"md"}
        navbar={{ breakpoint: "sm", width: 250 }}
      >
        <AppShell.Header pl="xl">
          <h1>Form</h1>
        </AppShell.Header>
        <AppShell.Navbar>
          <h3>Yo yo chiki chiki</h3>
        </AppShell.Navbar>
        <AppShell.Main>
          <AppShell.Section>
            <p>now this is a section</p>
          </AppShell.Section>
          <Input.Wrapper title="He he ha ha">
            <Input placeholder="Name" />
          </Input.Wrapper>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
