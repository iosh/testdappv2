import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback } from "react";
interface Props {
  connected: boolean;
  title: string;
  onConnect: () => Promise<void>;
  onDisconnect: () => Promise<void>;
}
export const ActionButton = ({
  connected,
  title,
  onConnect,
  onDisconnect,
}: Props) => {
  const [loading, { open, close }] = useDisclosure();

  const handleClick = useCallback(async () => {
    open();
    if (connected) {
      await onDisconnect();
    } else {
      await onConnect();
    }

    close();
  }, [connected, onConnect, onDisconnect, open, close]);
  return (
    <Button
      onClick={handleClick}
      loading={loading}
      color={connected ? "lime" : ""}
    >
      {!connected ? `connect to ${title}` : `disconnect ${title}`}
    </Button>
  );
};
