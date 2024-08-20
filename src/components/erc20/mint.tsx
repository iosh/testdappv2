import { Box, Button, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useCallback } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { isAddress } from "viem";

interface Props {
	onMint: (n: ERC20FormValues) => Promise<void>;
}

export interface ERC20FormValues {
	receiver: string;
	amount: string;
}
export const Mint20 = ({ onMint }: Props) => {
	const { address } = useWeb3ModalAccount();
	const form = useForm<ERC20FormValues>({
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
		async (values: ERC20FormValues) => {
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
				<NumberInput
					label="amount default to 1 ( decimal 18, input 1 === 10**18 )"
					{...form.getInputProps("amount")}
				/>

				<Button mt={10} type="submit" loading={loading}>
					Mine
				</Button>
			</form>
		</Box>
	);
};
