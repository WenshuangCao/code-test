import React from 'react';
import { Button as UiwButton, ButtonProps } from 'uiw';

type ButtonPropsType = ButtonProps & { icon: string | undefined };

export const Button = (props: ButtonPropsType) => {
  return (
    <UiwButton
      type={props.type ?? 'warning'}
      icon={props.icon ?? null}
      size="large"
      onClick={props.onClick}>
      {props.children}
    </UiwButton>
  );
};
