'use client';
import { useRouter } from 'next/navigation';

export default function ServiceButton(props) {
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
    <button
      onClick={() => {
        handleService(props.userId, props.serviceId),
          createSession((props.fitness.default_price as Stripe.Price).id);
      }}
    >
      BUY
    </button>
  );
}
