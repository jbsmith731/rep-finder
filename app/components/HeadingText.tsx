import type { VariantProps } from 'cva';
import { cva, cx } from 'cva';
import * as React from 'react';
import type { PolymorphicComponentProps } from 'types';

type HeadingProps<C extends React.ElementType> = VariantProps<typeof styles> &
  PolymorphicComponentProps<
    C,
    {
      as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      children: React.ReactNode;
    }
  >;

const styles = cva('font-bold', {
  variants: {
    size: {
      '-1': 'text-sm',
      '0': 'text-base',
      '1': 'text-lg',
      '2': 'text-xl',
      '3': 'text-2xl',
      '4': 'text-3xl',
      '5': 'text-4xl',
      '6': 'text-6xl',
    },
    color: {
      white: 'text-white',
      black: 'text-gray-800',
    },
  },
  defaultVariants: {
    size: '2',
    color: 'black',
  },
});

export const HeadingText = <C extends React.ElementType = 'p'>({
  as,
  size,
  color,
  className,
  ...restProps
}: HeadingProps<C>) => {
  const component = as || 'h2';

  return React.createElement(component, {
    className: cx(className, styles({ size, color })),
    ...restProps,
  });
};
