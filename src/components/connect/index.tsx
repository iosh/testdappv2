import { Card, Title, Text, Flex } from "@mantine/core";
import {
	useWeb3Modal,
	useWeb3ModalAccount,
	useDisconnect,
} from "@web3modal/ethers/react";
import "./index.css";
import { ActionButton } from "./ActionButton";

export const Connect = () => {
	const { open } = useWeb3Modal();
	const { isConnected, address } = useWeb3ModalAccount();
	const { disconnect } = useDisconnect();

	return (
		<Flex justify="center">
			<Card className="connect" shadow="sm" padding="lg" radius="md" withBorder>
				<Title order={3} ta="center">
					{isConnected
						? "Disconnect from Wallet Connect"
						: "Connect to Wallet Connect"}{" "}
				</Title>
				<Text size="sm" c="dimmed" ta="center">
					{isConnected ? address : "Not connected"}
				</Text>

				<ActionButton
					title="eSpace Mainnet"
					onConnect={open}
					onDisconnect={disconnect}
					connected={isConnected}
				/>
			</Card>
		</Flex>
	);
};
