import type { civicinfo_v2 } from '@googleapis/civicinfo';
import { cx } from 'cva';
import * as React from 'react';

interface AddressProps extends React.HTMLAttributes<HTMLElement> {
  address: civicinfo_v2.Schema$SimpleAddressType;
}

export const Address = ({ address, className, ...props }: AddressProps) => {
  if (!address) return null;

  const { line1, city, state, zip } = address ?? {};

  return (
    <address className={cx(className, 'not-italic leading-tight')} {...props}>
      {line1}
      <br />
      {city}, {state} {zip}
    </address>
  );
};
