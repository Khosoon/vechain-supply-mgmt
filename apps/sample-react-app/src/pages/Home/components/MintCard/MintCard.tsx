import {
  Badge,
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFiorinoMinter } from "../../../../hooks/useFiorinoMinter";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useMintFiorino } from "../../../../hooks/useMintFiorino";

interface MintForm {
  amount: string;
  receiver: string;
}

export const MintCard = () => {
  const form = useForm<MintForm>();

  const { errors } = form.formState;

  const mintMutation = useMintFiorino({
    onSuccess: () => {
      console.log("mint success");
    },
  });

  const onSubmit = useCallback(
    (data) => {
      mintMutation.sendTransaction(data);
    },
    [mintMutation]
  );

  const minter = useFiorinoMinter();
  console.log("minter", minter);
  const isMinter = true;
  if (!isMinter) {
    return null;
  }
  return (
    <Card>
      <CardBody>
        <VStack
          align={"stretch"}
          as="form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <HStack justify={"flex-end"} w="full">
            {isMinter && <Badge colorScheme="orange">Admin</Badge>}
          </HStack>
          <VStack align={"stretch"}>
            <Text fontSize="lg" fontWeight="bold">
              Mint
            </Text>
            <FormControl isInvalid={!!errors.amount}>
              <FormLabel>Amount</FormLabel>
              <Input
                {...form.register("amount", {
                  required: {
                    value: true,
                    message: "Amount is required",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Invalid amount",
                  },
                })}
              />
              <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.amount}>
              <FormLabel>Receiver</FormLabel>
              <Input
                {...form.register("receiver", {
                  required: {
                    value: true,
                    message: "Receiver is required",
                  },
                  pattern: {
                    value: /^0x[a-fA-F0-9]{40}$/,
                    message: "Invalid address",
                  },
                })}
              />
              <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Mint
            </Button>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};
