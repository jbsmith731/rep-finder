import { Address } from '@components/Address';
import { Card } from '@components/Card';
import { heading } from '@components/HeadingText';
import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData, useTransition } from '@remix-run/react';
import { getOffices } from '@util/getReps';

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const address = form.get('address');

  if (!address)
    return json({ error: 'Address not valid', offices: null, address });

  try {
    const offices = await getOffices(address);

    if (!offices?.length) {
      return json({ offices: null, error: `No reps found`, address });
    }

    return json({ offices, error: null, address });
  } catch (error) {
    return json({ offices: null, error, address });
  }
};

export default function Index() {
  const { offices, error } = useActionData<typeof action>() ?? {};
  const transition = useTransition();
  const submitting = transition.state === 'submitting';

  console.log(error);

  return (
    <div className="text-gray-600">
      <section className="bg-indigo-500 py-24 text-center">
        <h1 className={heading({ size: '6', color: 'white' })}>
          Find your reps
        </h1>

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
                <h2 className={heading({ className: 'mb-4', size: '4' })}>
                  {rep.office}
                </h2>

                <ul className="grid sm:grid-cols-2 gap-6">
                  {rep.officials?.map((official) => {
                    if (!official) return null;

                    return (
                      <Card key={official.name}>
                        <h3 className={heading({ size: '2' })}>
                          {official.name}
                        </h3>
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
