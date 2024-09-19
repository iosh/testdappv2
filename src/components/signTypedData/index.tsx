import { Button, Card, Flex, Text, Textarea, Title } from "@mantine/core";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import "./index.css";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useMemo, useState } from "react";
import { walletConnectModel } from "../../walletConnect";
import {
	type Address,
	createWalletClient,
	custom,
	type Hex,
	verifyTypedData,
} from "viem";
import { confluxESpaceTestnet } from "viem/chains";

const getTypedData = (chainId: number) => {
	return {
		domain: {
			chainId: chainId,
			name: "Ether Mail",
			verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC" as Hex,
			version: "1",
		},
		message: {
			contents: "Hello, Bob!\n How are you?\n It's great to see you!\n Bye!", 
			from: {
				name: "Cow",
				wallets: [
					"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
					"0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF",
				],
			},
			to: [
				{
					name: "Bob",
					wallets: [
						"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
						"0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57",
						"0xB0B0b0b0b0b0B000000000000000000000000000",
					],
				},
			],
			attachment: "0x",
		},
		primaryType: "Mail" as const,
		types: {
			Mail: [
				{ name: "from", type: "Person" },
				{ name: "to", type: "Person[]" },
				{ name: "contents", type: "string" },
				{ name: "attachment", type: "bytes" },
			],
			Person: [
				{ name: "name", type: "string" },
				{ name: "wallets", type: "address[]" },
			],
		},
	};
};

export const SignTypedData = () => {
	const { address, chainId } = useWeb3ModalAccount();

	const [loading, { open, close }] = useDisclosure();

	const [error, setError] = useState("");
	const typedData = useMemo(() => getTypedData(chainId), [chainId]);
	const [signature, setSignature] = useState("");

	const handleSubmit = useCallback(async () => {
		const provider = walletConnectModel.getWalletProvider();
		setSignature("");
		setError("");
		if (!provider) {
			return setError("Wallet not connected");
		}

		try {
			open();

			const walletClient = createWalletClient({
				account: address as Address,
				chain: confluxESpaceTestnet,
				transport: custom(provider),
			});

			const signature = await walletClient.signTypedData(typedData);

			const isValid = verifyTypedData({
				address,
				...typedData,
				signature,
			});

			if (!isValid) {
				return setError("signTypedData is not valid");
			}

			setSignature(signature);
		} catch (error: any) {
			setError(error?.message);
		} finally {
			close();
		}
	}, [address, close, open, typedData]);

	return (
		<Card className="card" shadow="sm" padding="lg" radius="md" withBorder>
			<Flex direction="column" gap={10}>
				<Title ta={"center"}>sign typed data</Title>

				<Textarea
					classNames={{ input: "signTypedDataTextarea" }}
					value={JSON.stringify(typedData, null, 2)}
					readOnly
				/>

				<Button loading={loading} onClick={handleSubmit}>
					Sign typed data
				</Button>
				{error && <Text c="red">{error}</Text>}
				{signature && (
					<Text style={{ wordBreak: "break-all" }}>
						sigh typed data is success: {signature}
					</Text>
				)}
			</Flex>
		</Card>
	);
};
