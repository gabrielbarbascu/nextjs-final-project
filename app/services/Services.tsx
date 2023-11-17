'use client';
import { useRouter } from 'next/navigation';
//import { useState } from 'react';
import Stripe from 'stripe';

type Props = {
  fitness: Stripe.Product;
  fitnessn: Stripe.Product;
  fitnessp: Stripe.Product;
  isLoggedIn: boolean; // Add the isLoggedIn prop
  userId: number; // Add userId prop
  serviceId: number;
};

export default function Services(props: Props) {
  const router = useRouter();
  async function handleService(userId, serviceId) {
    const response = await fetch('/api/services', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        serviceId,
      }),
    });

    const data: ServiceResponseBodyPost = await response.json();
  }

  async function createSession(priceId: string) {
    const response = await fetch('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({
        price: priceId,
        quantity: 1,
      }),
    });

    const data = await response.json();
    console.log(data);
    // we should check for errors

    router.push(data.session.url);
  }

  return (
    <>
      <div>
        <h2>{props.fitness.name}</h2>
        <h2>{props.fitness.description}</h2>
        {props.isLoggedIn ? (
          <button
            onClick={() => {
              handleService(props.userId, props.serviceId),
                createSession((props.fitness.default_price as Stripe.Price).id);
            }}
          >
            Buy for €{' '}
            {(props.fitness.default_price as Stripe.Price).unit_amount! / 100}
          </button>
        ) : (
          <p>Please log in to purchase</p>
        )}
      </div>
      <div>
        <br />
        <h2>{props.fitnessn.name}</h2>
        <h2>{props.fitnessn.description}</h2>
        {props.isLoggedIn ? (
          <button
            onClick={() => {
              handleService(props.userId, props.serviceId),
                createSession(
                  (props.fitnessn.default_price as Stripe.Price).id,
                );
            }}
          >
            Buy for €{' '}
            {(props.fitnessn.default_price as Stripe.Price).unit_amount! / 100}
          </button>
        ) : (
          <p>Please log in to purchase</p>
        )}
      </div>
      <div>
        <h2>{props.fitnessp.name}</h2>
        <h2>{props.fitnessp.description}</h2>
        {props.isLoggedIn ? (
          <button
            onClick={() => {
              handleService(props.userId, props.serviceId),
                createSession(
                  (props.fitnessp.default_price as Stripe.Price).id,
                );
            }}
          >
            Buy for €{' '}
            {(props.fitnessp.default_price as Stripe.Price).unit_amount! / 100}
          </button>
        ) : (
          <p>Please log in to purchase</p>
        )}
      </div>
    </>
  );
}
