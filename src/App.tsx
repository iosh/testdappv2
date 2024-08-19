import "@mantine/core/styles.css";
import { Box, Button, Flex, MantineProvider, Text } from "@mantine/core";
import "./App.css";
import { Connect } from "./components/connect";
import { Transaction } from "./components/tansaction";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

function App() {
	const { isConnected } = useWeb3ModalAccount();

	return (
		<MantineProvider>
			<Box m="lg">
				<Connect />
			</Box>
			{isConnected && (
				<Box>
					<Box ml={20}>
						<Button
							onClick={() =>
								window.open("https://www.alchemy.com/gwei-calculator")
							}
						>
							CFX to wei
						</Button>
					</Box>

					<Flex m="lg">
						<Transaction />
					</Flex>
				</Box>
			)}
		</MantineProvider>
	);
}

export default App;
