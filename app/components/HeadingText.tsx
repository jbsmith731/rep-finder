import { cva } from 'cva';

export const heading = cva('font-bold', {
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
