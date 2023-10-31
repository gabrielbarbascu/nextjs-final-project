'use client';

export default function ServiceButton(props) {
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
  return (
    <button onClick={() => handleService(props.userId, props.serviceId)}>
      test
    </button>
  );
}
