import type { civicinfo_v2 } from '@googleapis/civicinfo';

const ENDPOINT = 'https://www.googleapis.com/civicinfo/v2/representatives';
const KEY = process.env.GOOGLE_KEY;

export interface IOffices {
  office: 'U.S. Senator' | 'U.S. Representative';
  officials: Array<civicinfo_v2.Schema$Official | undefined > | undefined;
}

export const getOffices = async (
  address: FormDataEntryValue
): Promise<IOffices[] | undefined> => {
  const data: civicinfo_v2.Schema$RepresentativeInfoResponse = await fetch(`${ENDPOINT}?key=${KEY}&address=${address}`).then(
    (response) => response.json()
  );

  const filteredOffices = data.offices?.filter(
    (office) =>
      office.name && /U\.S\.\s(Senator|Representative)/.test(office.name)
  );

  if (!filteredOffices?.length) return;

  const offices = filteredOffices?.map(
    (office): IOffices => ({
      office: office.name,
      officials: office.officialIndices?.map((index) => data.officials?.[index]),
    })
  );

  return offices;
};
