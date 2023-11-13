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

  //console.log('fitness', fitness);
  //console.log('fitnessn', fitnessn);
  //console.log('fitnessp', fitnessp);

  //console.log(user);

  const services = await getServices();
  return (
    <div>
      <h1>YOU CHOOSE HOW YOU WANT TO REACH YOUR GREATNESS.</h1>
      {services.map((service) => (
        <div key={`service-div-${service.id}`}>
          {/*<h2>{service.name}</h2>
          <p>{service.description}</p>
          <p>{service.duration}</p>
      <p>{service.price}$</p> */}

          {/*  {user ? (
            <ServiceButton userId={user.id} serviceId={service.id} />
          ) : (
            ''
          )} */}

          <hr />
        </div>
      ))}
      <Services fitness={fitness} fitnessn={fitnessn} fitnessp={fitnessp} />
    </div>
  );
}
