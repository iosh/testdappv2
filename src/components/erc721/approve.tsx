import { Box, Button, NativeSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCallback } from "react";
import { isAddress } from "viem";

export interface Approve721FormValues {
	approveAddress: string;
	approved: string;
}

interface Props {
	onApprove: (n: Approve721FormValues) => Promise<void>;
}

export const Approve721 = ({ onApprove: onTransfer }: Props) => {
	const form = useForm<Approve721FormValues>({
		mode: "uncontrolled",
		initialValues: {
			approveAddress: "",
			approved: "true",
		},
		validate: {
			approveAddress: (address) =>
				isAddress(address) ? null : "Invalid address",
		},
	});

	const [loading, { open, close }] = useDisclosure();
	const handleSubmit = useCallback(
		async (values: Approve721FormValues) => {
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
				<NativeSelect
					label="approved"
					data={["true", "false"]}
					{...form.getInputProps("approved")}
				/>
				<Button mt={10} type="submit" loading={loading}>
					setApprovalForAll
				</Button>
			</form>
		</Box>
	);
};
