import type { civicinfo_v2 } from '@googleapis/civicinfo';

const ENDPOINT = 'https://www.googleapis.com/civicinfo/v2/representatives';
const KEY = process.env.GOOGLE_KEY;

export const getOffices = async (
  address: FormDataEntryValue
) => {
  const data: civicinfo_v2.Schema$RepresentativeInfoResponse = await fetch(`${ENDPOINT}?key=${KEY}&address=${address}`).then(
    (response) => response.json()
  );

  const filteredOffices = data.offices?.filter(
    (office) =>
      office.name && /U\.S\.\s(Senator|Representative)/.test(office.name)
  );

  if (!filteredOffices?.length) return;

  const offices = filteredOffices?.map(
    (office) => ({
      office: office.name,
      officials: office.officialIndices?.map((index) => data.officials?.[index]),
    })
  );

  return offices;
};
