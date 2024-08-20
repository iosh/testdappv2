import { Box, Button, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useCallback } from "react";
import { isAddress } from "viem";

export interface Approve2020FormValues {
	approveAddress: string;
	amount: string;
}

interface Props {
	onApprove: (n: Approve2020FormValues) => Promise<void>;
}

export const Approve20 = ({ onApprove: onTransfer }: Props) => {
	const { address } = useWeb3ModalAccount();
	const form = useForm<Approve2020FormValues>({
		mode: "uncontrolled",
		initialValues: {
			approveAddress: address,
			amount:
				"115792089237316195423570985008687907853269984665640564039457584007913129639935",
		},
		validate: {
			approveAddress: (address) =>
				isAddress(address) ? null : "Invalid address",
			amount: (amount) => {
				try {
					BigInt(amount);
					return null;
				} catch (e) {
					return "Invalid amount";
				}
			},
		},
	});

	const [loading, { open, close }] = useDisclosure();
	const handleSubmit = useCallback(
		async (values: Approve2020FormValues) => {
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
					label="approve to address"
					{...form.getInputProps("approveAddress")}
				/>
				<Textarea label="amount" {...form.getInputProps("amount")} size="xs" />
				<Button mt={10} type="submit" loading={loading}>
					approve
				</Button>
			</form>
		</Box>
	);
};
