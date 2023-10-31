/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonColorVariant, ButtonContainer } from "./Button.styles";

interface buttonProps {
  variant?: ButtonColorVariant;
}

export default function Button({ variant = "primary" }: buttonProps) {
  return <ButtonContainer variant={variant}>Botao</ButtonContainer>;
}
