import { cookies } from 'next/headers';
import { getServices } from '../../database/services';
import { getUserBySessionToken } from '../../database/users';
import { stripeClient } from '../../util/stripe';
import Services from './Services';

export const metadata = {
  title: { default: 'Services ', template: '%s ' },
  description: 'Choose your fitness plan',
};

export default async function ServicesPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));
  const fitness = await stripeClient.products.retrieve(
    process.env.FITNESS_ID!,
    {
      expand: ['default_price'],
    },
  );

  const fitnessn = await stripeClient.products.retrieve(
    process.env.FITNESSN_ID!,
    {
      expand: ['default_price'],
    },
  );
  const fitnessp = await stripeClient.products.retrieve(
    process.env.FITNESSP_ID!,
    {
      expand: ['default_price'],
    },
  );

  const services = await getServices();
  return (
    <div>
      <h1>YOU CHOOSE HOW YOU WANT TO REACH YOUR GREATNESS.</h1>
      {services.map((service) => (
        <div key={`service-div-${service.id}`}>
          <hr />
        </div>
      ))}
      <Services
        fitness={fitness}
        fitnessn={fitnessn}
        fitnessp={fitnessp}
        isLoggedIn={!!user}
      />
    </div>
  );
}
