import { Box, Button, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useCallback } from "react";
import { isAddress } from "viem";

export interface Transfer721FormValues {
	from: string;
	receiver: string;
	id: string;
}

interface Props {
	onTransfer: (n: Transfer721FormValues) => Promise<void>;
}

export const Transfer721 = ({ onTransfer }: Props) => {
	const { address } = useWeb3ModalAccount();
	const form = useForm<Transfer721FormValues>({
		mode: "uncontrolled",
		initialValues: {
			from: address,
			receiver: address,
			id: "",
		},
		validate: {
			receiver: (address) => (isAddress(address) ? null : "Invalid address"),
			id: (id) => (id >=0 ? null : "Invalid id"),
		},
	});

	const [loading, { open, close }] = useDisclosure();
	const handleSubmit = useCallback(
		async (values: Transfer721FormValues) => {
			open();
			await onTransfer(values);
			close();
		},
		[close, open, onTransfer],
	);

	return (
		<Box>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<TextInput label="from address" {...form.getInputProps("receiver")} />
				<TextInput
					label="receiver address"
					{...form.getInputProps("receiver")}
				/>
				<NumberInput label="nft id" {...form.getInputProps("id")} />
				<Button mt={10} type="submit" loading={loading}>
					safeTransferFrom
				</Button>
			</form>
		</Box>
	);
};
