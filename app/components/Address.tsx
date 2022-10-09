import type { civicinfo_v2 } from '@googleapis/civicinfo';

interface AddressProps {
  address: civicinfo_v2.Schema$SimpleAddressType;
}

export const Address = ({ address }: AddressProps) => {
  if (!address) return null;

  const { line1, city, state, zip } = address ?? {};

  return (
    <address>
      {line1}
      <br />
      {city}, {state} {zip}
    </address>
  );
};
