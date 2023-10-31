import styled, { css } from 'styled-components'

export type ButtonColorVariant = 'primary' | 'secundary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonColorVariant
}

const buttonColorVariant = {
  primary: 'purple',
  secundary: 'orange',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  margin-right: 8px;
  border-radius: 4px;
  border: 0;

  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};

  /* ${(props) => {
    return css`
      background-color: ${buttonColorVariant[props.variant]};
    `
  }} */
`
