import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCallback } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { isAddress } from "viem";

interface Props {
	onMint: (n: ERC721FormValues) => Promise<void>;
}

export interface ERC721FormValues {
	receiver: string;
}
export const Mint721 = ({ onMint }: Props) => {
	const { address } = useWeb3ModalAccount();
	const form = useForm<ERC721FormValues>({
		mode: "uncontrolled",
		initialValues: {
			receiver: address,
		},
		validate: {
			receiver: (address) => (isAddress(address) ? null : "Invalid address"),
		},
	});

	const [loading, { open, close }] = useDisclosure();
	const handleSubmit = useCallback(
		async (values: ERC721FormValues) => {
			open();
			await onMint(values);
			close();
		},
		[close, open, onMint],
	);

	return (
		<Box>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<TextInput
					label="receiver address"
					{...form.getInputProps("receiver")}
				/>
				<Button mt={10} type="submit" loading={loading}>
					Mine
				</Button>
			</form>
		</Box>
	);
};
