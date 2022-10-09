import { Address } from '@components/Address';
import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData, useTransition } from '@remix-run/react';
import type { IOffices } from '@util/getReps';
import { getOffices } from '@util/getReps';

type ActionData = {
  offices: Array<IOffices>;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const address = form.get('address');

  // Improve this error?
  if (!address) return json({ error: 'address not valid' });

  const offices = await getOffices(address);

  return { offices };
};

export default function Index() {
  const { offices } = useActionData<ActionData>() ?? {};
  const transition = useTransition();
  const submitting = transition.state === 'submitting';

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>

      <Form method="post">
        <label>Address</label>
        <input type="text" name="address" required />
        <button type="submit">{submitting ? 'Submitting...' : 'Submit'}</button>
      </Form>

      {offices
        ? offices.map((rep) => (
            <div key={rep.office}>
              <h2>{rep.office}</h2>

              <ul>
                {rep.officials.map((official) => (
                  <li key={official.name}>
                    <h3>{official.name}</h3>

                    {official.party}
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
                      <ul>
                        {official.channels?.map((channel) => (
                          <li key={channel.type}>
                            <a
                              href={`${SOCIAL_LOOKUP[channel.type]?.link}/${
                                channel.id
                              }`}
                            >
                              {channel.type}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))
        : null}
    </div>
  );
}

const SOCIAL_LOOKUP = {
  Twitter: {
    link: 'https://twitter.com',
  },
  Facebook: {
    link: 'https://facebook.com',
  },
};
