import {
	Button,
	TextInput,
	Card,
	Title,
	NativeSelect,
	NumberInput,
	Flex,
	Box,
	Textarea,
	Checkbox,
	Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useState } from "react";
import {
	createWalletClient,
	custom,
	formatTransactionRequest,
	isAddress,
	isHex,
	type AccessList,
	type Address,
	type Prettify,
	type TransactionRequestBase,
	type UnionOmit,
} from "viem";
import { identity, pickBy } from "lodash-es";
import "./index.css";
import { walletConnectModel } from "../../walletConnect";
import { confluxESpaceTestnet } from "viem/chains";
import { CONFLUX_SCAN_URL } from "../../utlis/constant";

export type TxType = Prettify<
	UnionOmit<
		TransactionRequestBase<number, number> & {
			accessList: AccessList;
		} & {
			gasPrice: number | undefined;
			maxFeePerGas: number | undefined;
			maxPriorityFeePerGas: number | undefined;
		} & {
			type: "legacy" | "eip2930" | "eip1559";
		} & {
			autoPrepareTx: boolean;
		},
		"from"
	>
>;

export const txTypeMap = {
	legacy: "0",
	eip2930: "1",
	eip1559: "2",
};

export const Transaction = () => {
	const { address } = useWeb3ModalAccount();
	const form = useForm<TxType>({
		mode: "controlled",
		initialValues: {
			to: address as Address,
			type: "legacy",
			value: undefined,
			data: undefined,
			nonce: undefined,

			// legacy
			gas: undefined,
			gasPrice: undefined,

			// 1559
			maxFeePerGas: undefined,
			maxPriorityFeePerGas: undefined,

			// 2930
			accessList: [],

			// auto fill tx fields
			autoPrepareTx: false,
		},
		validate: {
			to: (to) => (isAddress(to || "") ? null : "Invalid address"),
			data: (data) =>
				typeof data === "undefined" || isHex(data || "")
					? null
					: "Invalid data",
		},
	});

	const [loading, { open, close }] = useDisclosure();

	const [sendValueJson, setSendValueJson] = useState("");
	const [autoPrepareTxTxJson, setAutoPrepareTxTxJson] = useState("");
	const [error, setError] = useState("");

	const [txHash, setTxHash] = useState("");

	const values = form.getValues();

	const getEip2930 = () => {
		return (
			<Box>
				<Title order={6}>AccessList</Title>
				<Box ml={10}>
					{values.accessList.map((item, accessListIndex) => (
						<Box ml={10} key={`${item.address}${accessListIndex}`}>
							<TextInput
								label="Address"
								{...form.getInputProps(`accessList.${accessListIndex}.address`)}
							/>
							{item.storageKeys.map((key, storageKeysIndex) => (
								<Flex direction={"row"} align={"flex-end"} key={key}>
									<TextInput
										flex={1}
										label={`key-${storageKeysIndex + 1}`}
										{...form.getInputProps(
											`accessList.${accessListIndex}.storageKeys.${storageKeysIndex}`,
										)}
									/>
									<Button
										onClick={() =>
											form.setFieldValue(
												`accessList.${accessListIndex}.storageKeys`,
												item.storageKeys.filter(
													(_, i) => i !== storageKeysIndex,
												),
											)
										}
									>
										Remove
									</Button>
								</Flex>
							))}
							<Button
								mt={10}
								onClick={() =>
									form.setFieldValue(
										`accessList.${accessListIndex}.storageKeys`,
										[
											...values.accessList[accessListIndex].storageKeys,
											`0x${values.accessList[accessListIndex].storageKeys.length + 1}`,
										],
									)
								}
							>
								Add storageKeys
							</Button>
						</Box>
					))}
					<Button
						mt={10}
						onClick={() =>
							form.setFieldValue("accessList", [
								...values.accessList,
								{ address: "0x", storageKeys: ["0x"] },
							])
						}
					>
						Add accessList
					</Button>
				</Box>
			</Box>
		);
	};

	const renderFee = (type: TxType["type"]) => {
		if (type === "legacy" || type === "eip2930") {
			return (
				<Box>
					<TextInput
						label="gas(in Gwei)"
						key={form.key("gas")}
						{...form.getInputProps("gas")}
					/>
					<TextInput
						label="gasPrice(in Gwei)"
						key={form.key("gasPrice")}
						{...form.getInputProps("gasPrice")}
					/>

					{type === "eip2930" && getEip2930()}
				</Box>
			);
		}

		if (type === "eip1559") {
			return (
				<Box>
					{getEip2930()}

					<TextInput
						label="maxFeePerGas(in Gwei)"
						{...form.getInputProps("maxFeePerGas")}
					/>
					<TextInput
						label="maxPriorityFeePerGas(in Gwei)"
						{...form.getInputProps("maxPriorityFeePerGas")}
					/>
				</Box>
			);
		}
	};

	const handleSubmit = async (values: TxType) => {
		setAutoPrepareTxTxJson("");
		setSendValueJson("");
		setError("");
		open();
		const { autoPrepareTx, ...tx } = values;

		const rawTxObj = {
			...tx,
			from: address,
			accessList: tx.accessList.length === 0 ? undefined : tx.accessList,
		};

		setSendValueJson(
			JSON.stringify(
				{
					...rawTxObj,
					type: txTypeMap[tx.type],
				},
				(_, value) => (typeof value === "bigint" ? String(value) : value),
				2,
			),
		);
		try {
			const cleanTx = pickBy(rawTxObj, identity) as unknown as any;

			const provider = walletConnectModel.getWalletProvider();

			if (typeof provider === "undefined") {
				return setError("Wallet not connected");
			}
			const walletClient = createWalletClient({
				account: address as Address,
				chain: confluxESpaceTestnet,
				transport: custom(provider),
			});

			let requestTx = formatTransactionRequest(cleanTx);
			if (autoPrepareTx) {
				const prepareTx = await walletClient.prepareTransactionRequest(cleanTx);

				requestTx = formatTransactionRequest({ ...prepareTx });
				setAutoPrepareTxTxJson(
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
			} else {
				const hash = await provider.request({
					method: "eth_sendTransaction",
					params: [requestTx],
				});

				setTxHash(hash);
			}
		} catch (error: any) {
			setError(error.message);
			close();
		} finally {
			close();
		}
	};

	return (
		<Flex direction={"row"} gap={20}>
			<Card className="card" shadow="sm" padding="lg" radius="md" withBorder>
				<Title order={3} ta={"center"}>
					Send Transaction
				</Title>

				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						label="to"
						placeholder="Enter recipient address"
						key={form.key("to")}
						{...form.getInputProps("to")}
					/>

					<NativeSelect
						label="type"
						key={form.key("type")}
						data={["legacy", "eip2930", "eip1559"]}
						{...form.getInputProps("type")}
					/>

					<NumberInput
						label="nonce"
						key={form.key("nonce")}
						{...form.getInputProps("nonce")}
					/>

					<NumberInput
						label="value(in wei)"
						key={form.key("value")}
						min={0}
						{...form.getInputProps("value")}
					/>

					<TextInput
						label="tx data(start with 0x)"
						key={form.key("data")}
						{...form.getInputProps("data")}
					/>
					{renderFee(values.type)}

					<Checkbox
						mt={10}
						label="Auto Prepare Tx"
						{...form.getInputProps("autoPrepareTx")}
					/>

					<Button mt={10} type="submit" loading={loading}>
						Submit Tx
					</Button>
				</form>

				<Box>{error && <Text c="red">Error: {error}</Text>}</Box>
			</Card>

			<Card className="card" shadow="sm" padding="lg" radius="md" withBorder>
				<Title order={3} ta={"center"}>
					Send Transaction Value And Response
				</Title>
				<Textarea
					classNames={{ input: "defaultTextArea" }}
					label="raw tx fields"
					value={sendValueJson}
					readOnly
				/>
				<Box mt={10}>
					<span>Auto PrepareTx: {`${values.autoPrepareTx}`}</span>
				</Box>
				{values.autoPrepareTx && (
					<Textarea
						mt={10}
						classNames={{ input: "defaultTextArea" }}
						value={autoPrepareTxTxJson}
						readOnly
					/>
				)}

				{txHash && (
					<Box mt={10}>
						<Title order={5}>Transaction Hash</Title>
						<Text style={{ wordBreak: "break-all" }}>{txHash}</Text>
						<Button
							mt={10}
							onClick={() =>
								window.open(`${CONFLUX_SCAN_URL}/tx/${txHash}`)
							}
						>
							OpenInScan
						</Button>
					</Box>
				)}
			</Card>
		</Flex>
	);
};
