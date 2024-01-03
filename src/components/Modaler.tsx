import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Modaler({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={<h1>{title}</h1>}>
        {children}
      </Modal>
      <Button onClick={open}>Open modal</Button>
    </>
  );
}
