import { Address } from '@components/Address';
import { Card } from '@components/Card';
import { HeadingText } from '@components/HeadingText';
import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData, useTransition } from '@remix-run/react';
import { getOffices } from '@util/getReps';

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const address = form.get('address');

  // Improve this error?
  if (!address) return json({ error: 'address not valid', offices: null });

  const offices = await getOffices(address);

  return json({ offices, error: null });
};

export default function Index() {
  const { offices } = useActionData<typeof action>() ?? {};
  const transition = useTransition();
  const submitting = transition.state === 'submitting';

  return (
    <div className="text-gray-600">
      <section className="bg-indigo-500 py-24 text-center">
        <HeadingText as="h1" size="6" color="white">
          Find your reps
        </HeadingText>

        <Form className="p-1 mt-4 rounded-md overflow-hidden" method="post">
          <label className="sr-only">Address</label>
          <input
            className="py-3 pl-2"
            type="text"
            name="address"
            placeholder="Address"
            required
          />
          <button
            className="py-3 px-4 bg-indigo-100 text-indigo-900"
            type="submit"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </Form>
      </section>

      {offices ? (
        <section className="py-24">
          <div className="w-max mx-auto grid grid-flow-row gap-y-12">
            {offices.map((rep) => (
              <div key={rep.office}>
                <HeadingText size="4" className="mb-4">
                  {rep.office}
                </HeadingText>

                <ul className="grid sm:grid-cols-2 gap-6">
                  {rep.officials?.map((official) => {
                    if (!official) return null;

                    return (
                      <Card key={official.name}>
                        <HeadingText size="2">{official.name}</HeadingText>

                        <span className="text-sm uppercase">
                          {official.party?.replace(/\sParty/, '')}
                        </span>
                        <br />

                        {official?.phones?.map((phone) => (
                          <a key={phone} href={`tel:${phone}`}>
                            {phone}
                          </a>
                        ))}

                        {official.address?.map((address, i) => (
                          <Address address={address} key={i} />
                        ))}

                        {official.channels?.length ? (
                          <ul className="flex gap-3">
                            {official.channels?.map((channel) => {
                              const { type, id } = channel ?? {};

                              if (!type || !id) return null;

                              const linkPrefix = SOCIAL_LOOKUP[type];
                              if (!linkPrefix) {
                                return <li key={channel.id}>{id}</li>;
                              }

                              return (
                                <li key={channel.type}>
                                  <a href={`${linkPrefix.link}/${id}`}>
                                    {type}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </Card>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

const SOCIAL_LOOKUP: Record<string, { link: string }> = {
  Twitter: {
    link: 'https://twitter.com',
  },
  Facebook: {
    link: 'https://facebook.com',
  },
};
