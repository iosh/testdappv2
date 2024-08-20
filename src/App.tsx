import "@mantine/core/styles.css";
import { Box, Button, Flex, MantineProvider } from "@mantine/core";
import "./App.css";
import { Connect } from "./components/connect";
import { Transaction } from "./components/tansaction";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { PersonalSign } from "./components/personalSign";
import { SignTypedData } from "./components/signTypedData";

function App() {
	const { isConnected } = useWeb3ModalAccount();

	return (
		<MantineProvider>
			<Box m="lg">
				<Connect />
			</Box>
			{isConnected && (
				<Box>
					<Flex ml={20} justify={"center"}>
						<Button
							onClick={() =>
								window.open("https://www.alchemy.com/gwei-calculator")
							}
						>
							CFX to wei
						</Button>
					</Flex>
					<Flex m="lg" justify={"center"}>
						<Transaction />
					</Flex>

					<Flex direction={"row"} gap={20} justify={"center"}>
						<PersonalSign />
						<SignTypedData />
					</Flex>
				</Box>
			)}
		</MantineProvider>
	);
}

export default App;
