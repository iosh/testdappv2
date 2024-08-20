import { Box, Button, Card, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { walletConnectModel } from "../../walletConnect";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { toHex, verifyMessage } from "viem";

interface FormValues {
	message: string;
}

export const PersonalSign = () => {
	const { address } = useWeb3ModalAccount();
	const [
		loadingWithoutEncode,
		{ open: openWithoutEncode, close: closeWithoutEncode },
	] = useDisclosure();
	const [loadingWithEncode, { open: openWithEncode, close: closeWithEncode }] =
		useDisclosure();
	const formWithoutEncode = useForm<FormValues>({
		mode: "uncontrolled",
		initialValues: {
			message: `message without encode ${address.slice(0, 4)}...${address.slice(-4)} - ${Math.floor(Math.random() * 100)}`,
		},

		validate: {
			message: (value) => (value !== "" ? null : "Message is required"),
		},
	});

	const formWithEncode = useForm<FormValues>({
		mode: "uncontrolled",
		initialValues: {
			message: `message with encode to hex ${address.slice(0, 4)}...${address.slice(-4)} - ${Math.floor(Math.random() * 100)}`,
		},

		validate: {
			message: (value) => (value !== "" ? null : "Message is required"),
		},
	});

	const [error, setError] = useState<string>("");
	const [signature, setSignature] = useState("");
	const handleSubmit = async (values: FormValues, isEncode: boolean) => {
		const provider = walletConnectModel.getWalletProvider();

		if (!provider) {
			return setError("Wallet not connected");
		}
		try {
			if (isEncode) {
				openWithEncode();
			} else {
				openWithoutEncode();
			}

			const sign = await provider.request({
				method: "personal_sign",
				params: [isEncode ? toHex(values.message) : values.message, address],
			});

			const valid = await verifyMessage({
				address,
				message: values.message,
				signature: sign,
			});

			setSignature(sign);
			if (!valid) {
				return setError("Invalid signature");
			}
		} catch (error: any) {
			setError(error.message);
		} finally {
			if (isEncode) {
				closeWithEncode();
			} else {
				closeWithoutEncode();
			}
		}
	};
	return (
		<Card className="card" shadow="sm" padding="lg" radius="md" withBorder>
			<Box mt={10}>
				<Title mb={10} order={3} ta={"center"}>
					personal sign(message is not encode to hex)
				</Title>

				<form
					onSubmit={formWithoutEncode.onSubmit((values) =>
						handleSubmit(values, false),
					)}
				>
					<TextInput {...formWithoutEncode.getInputProps("message")} />

					<Button mt={20} type="submit" loading={loadingWithoutEncode}>
						Sign Message{" "}
					</Button>
				</form>
			</Box>

			<Box mt={10}>
				<Title mb={10} order={3}>
					personal sign(message is encode to hex)
				</Title>
				<form
					onSubmit={formWithEncode.onSubmit((values) =>
						handleSubmit(values, true),
					)}
				>
					<TextInput {...formWithEncode.getInputProps("message")} />

					<Button mt={20} type="submit" loading={loadingWithEncode}>
						Sign Message (message is encode to hex)
					</Button>
				</form>
			</Box>

			{error && <Text c={"red"}>{error}</Text>}
			{signature && (
				<Text style={{ wordBreak: "break-all" }}>
					sign message success:{signature}
				</Text>
			)}
		</Card>
	);
};
