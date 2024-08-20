import {
	Box,
	Button,
	Card,
	Flex,
	Switch,
	Text,
	Textarea,
	TextInput,
	Title,
} from "@mantine/core";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useContractStore } from "../../store/contractState.ts";
import { useCallback, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { walletConnectModel } from "../../walletConnect.ts";
import {
	type Address,
	createWalletClient,
	custom,
	encodeDeployData,
	encodeFunctionData,
	formatTransactionRequest,
} from "viem";

import { useForm } from "@mantine/form";
import { confluxESpaceTestnet } from "viem/chains";
import { waitForTransactionReceipt } from "viem/actions";
import { type ERC721FormValues, Mint721 } from "./mint.tsx";
import { ERC721Contract } from "../../contract/erc721.ts";
import { Transfer721, type Transfer721FormValues } from "./transfer.tsx";
import { Approve721, type Approve721FormValues } from "./approve.tsx";

interface FormValues {
	name: string;
	symbol: string;
	autoPrepareTx: boolean;
}

export const NFT = () => {
	const { address } = useWeb3ModalAccount();
	const from = useForm<FormValues>({
		mode: "uncontrolled",
		initialValues: {
			name: "Test",
			symbol: "TEST",
			autoPrepareTx: false,
		},
	});

	const [sendTxJson, setSendTxJson] = useState("");
	const [contractAddress, setContractAddress] = useState("");
	const [txHash, setTxHash] = useState("");
	const deployedContract = useContractStore((state) => state.deployed);
	const addDeployedContract = useContractStore(
		(state) => state.addDeployedContract,
	);
	const removeDeployedContract = useContractStore(
		(state) => state.removeDeployedContract,
	);

	const [loading, { open, close }] = useDisclosure();
	const [error, setError] = useState("");

	const deployedContractAddress = deployedContract[`${address}-erc721`];

	const clearState = useCallback(() => {
		setError("");
		setSendTxJson("");
		setTxHash("");
		setContractAddress("");
	}, []);

	const handleDeployERC721 = useCallback(
		async (values: FormValues) => {
			const provider = walletConnectModel.getWalletProvider();
			clearState();
			if (!provider) {
				return setError("Wallet not connected");
			}

			try {
				open();
				const data = encodeDeployData({
					abi: ERC721Contract.abi,
					bytecode: ERC721Contract.bytecode,
					args: [values.name, values.symbol, ""],
				});

				const walletClient = createWalletClient({
					account: address as Address,
					chain: confluxESpaceTestnet,
					transport: custom(provider),
				});

				let requestTx = {
					from: address as Address,
					data,
				} as any;

				if (values.autoPrepareTx) {
					console.log("autoPrepareTx", values.autoPrepareTx);
					const tx = await walletClient.prepareTransactionRequest({
						data,
					});

					requestTx = { ...formatTransactionRequest(tx) };
				}

				setSendTxJson(
					JSON.stringify(
						requestTx,
						(_, value) => (typeof value === "bigint" ? String(value) : value),
						2,
					),
				);

				const hash = await provider.request({
					method: "eth_sendTransaction",
					params: [requestTx],
				});
				setTxHash(hash);
				const receipt = await waitForTransactionReceipt(walletClient, {
					hash,
					retryCount: 15,
				});
				setContractAddress(receipt.contractAddress || "");

				if (receipt.contractAddress) {
					addDeployedContract(`${address}-erc721`, receipt.contractAddress);
				}
			} catch (error: any) {
				setError(error.message);
			} finally {
				close();
			}
		},
		[address, open, close, addDeployedContract, clearState],
	);

	const handleMintERC721 = useCallback(
		async ({ receiver }: ERC721FormValues) => {
			const provider = walletConnectModel.getWalletProvider();
			clearState();
			if (!provider) {
				return setError("Wallet not connected");
			}

			try {
				const data = encodeFunctionData({
					abi: ERC721Contract.abi,
					functionName: "mint",
					args: [receiver as Address],
				});

				const tx = formatTransactionRequest({
					from: address as Address,
					to: deployedContractAddress?.contractAddress,
					data,
				});

				const hash = await provider.request({
					method: "eth_sendTransaction",
					params: [tx],
				});
				setTxHash(hash);
			} catch (error: any) {
				setError(error.message);
			}
		},
		[clearState, deployedContractAddress?.contractAddress, address],
	);

	const handleTransfer721 = useCallback(
		async ({ from, receiver, id }: Transfer721FormValues) => {
			const provider = walletConnectModel.getWalletProvider();
			clearState();
			if (!provider) {
				return setError("Wallet not connected");
			}

			try {
				const data = encodeFunctionData({
					abi: ERC721Contract.abi,
					functionName: "safeTransferFrom",
					args: [from as Address, receiver as Address, BigInt(id)],
				});

				const tx = formatTransactionRequest({
					from: address as Address,
					to: deployedContractAddress?.contractAddress,
					data,
				});

				const hash = await provider.request({
					method: "eth_sendTransaction",
					params: [tx],
				});
				setTxHash(hash);
			} catch (error: any) {
				setError(error.message);
			}
		},
		[clearState, deployedContractAddress?.contractAddress, address],
	);

	const handleApprove721 = useCallback(
		async ({ approveAddress, approved }: Approve721FormValues) => {
			const provider = walletConnectModel.getWalletProvider();
			clearState();
			if (!provider) {
				return setError("Wallet not connected");
			}

			try {
				const data = encodeFunctionData({
					abi: ERC721Contract.abi,
					functionName: "setApprovalForAll",
					args: [approveAddress as Address, approved === "true"],
				});

				const tx = formatTransactionRequest({
					from: address as Address,
					to: deployedContractAddress?.contractAddress,
					data,
				});

				const hash = await provider.request({
					method: "eth_sendTransaction",
					params: [tx],
				});
				setTxHash(hash);
			} catch (error: any) {
				setError(error.message);
			}
		},
		[clearState, deployedContractAddress?.contractAddress, address],
	);
	return (
		<Flex gap={20}>
			<Card className="card" shadow="sm" padding="lg" radius="md" withBorder>
				<Title mb={10} order={3} ta={"center"}>
					ERC721
				</Title>
				<Text>
					Contract address : {deployedContractAddress?.contractAddress}
				</Text>
				{deployedContractAddress ? (
					<Flex direction={"column"} gap={10}>
						<Button onClick={() => removeDeployedContract(`${address}`)}>
							Redeploy new contract
						</Button>

						<Mint721 onMint={handleMintERC721} />

						<Transfer721 onTransfer={handleTransfer721} />
						<Approve721 onApprove={handleApprove721} />
					</Flex>
				) : (
					<Box>
						<form onSubmit={from.onSubmit(handleDeployERC721)}>
							<TextInput label="name" {...from.getInputProps("name")} />
							<TextInput label="name" {...from.getInputProps("name")} />
							<Switch
								mt={10}
								label="auto prepare tx"
								{...from.getInputProps("autoPrepareTx")}
							/>
							<Button mt={10} type="submit" loading={loading}>
								Deploy Test ERC 721
							</Button>
						</form>
					</Box>
				)}
				{error && (
					<Text style={{ wordBreak: "break-all" }} c="red">
						{error}
					</Text>
				)}
			</Card>

			<Card className="card" shadow="sm" padding="lg" radius="md" withBorder>
				<Title order={5}>raw tx fields</Title>
				<Textarea
					classNames={{ input: "defaultTextArea" }}
					value={sendTxJson}
					readOnly
				/>

				{(txHash || contractAddress) && (
					<Box>
						{txHash && (
							<Box>
								<Text style={{ wordBreak: "break-all" }}>
									tx hash : {txHash}
								</Text>
								<Button
									onClick={() =>
										window.open(
											`https://evmtestnet.confluxscan.io/tx/${txHash}`,
										)
									}
								>
									Open in scan
								</Button>
							</Box>
						)}

						{contractAddress && (
							<Box>
								<Text>Contract deployed: {contractAddress}</Text>
							</Box>
						)}
					</Box>
				)}
			</Card>
		</Flex>
	);
};
