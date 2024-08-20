import { Box, Button, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useCallback } from "react";
import { isAddress } from "viem";

export interface Transfer20FormValues {
	receiver: string;
	amount: string;
}

interface Props {
	onTransfer: (n: Transfer20FormValues) => Promise<void>;
}

export const Transfer20 = ({ onTransfer }: Props) => {
	const { address } = useWeb3ModalAccount();
	const form = useForm<Transfer20FormValues>({
		mode: "uncontrolled",
		initialValues: {
			receiver: address,
			amount: "1",
		},
		validate: {
			receiver: (address) => (isAddress(address) ? null : "Invalid address"),
		},
	});

	const [loading, { open, close }] = useDisclosure();
	const handleSubmit = useCallback(
		async (values: Transfer20FormValues) => {
			open();
			await onTransfer(values);
			close();
		},
		[close, open, onTransfer],
	);

	return (
		<Box>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<TextInput
					label="receiver address"
					{...form.getInputProps("receiver")}
				/>
				<NumberInput
					label="amount default to 1 ( decimal 18, input 1 === 10**18 )"
					{...form.getInputProps("amount")}
				/>
				<Button mt={10} type="submit" loading={loading}>
					transfer
				</Button>
			</form>
		</Box>
	);
};
