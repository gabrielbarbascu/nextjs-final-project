'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phoneNumber,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/profile/${data.user.username}`);

    // revalidatePath() throws unnecessary error, will be used when stable
    // revalidatePath('/(auth)/login', 'page');
    router.refresh();
  }

  return (
    <form onSubmit={async (event) => await handleRegister(event)}>
      <label>
        Username
        <input onChange={(event) => setUsername(event.currentTarget.value)} />
      </label>
      <label>
        Password
        <input
          type="password"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>
      <label>
        First name
        <input
          type="first name"
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </label>

      <label>
        Last name
        <input
          type="last name"
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </label>

      <label>
        Date of birth
        <input
          type="date of birth"
          onChange={(event) => setDateOfBirth(event.currentTarget.value)}
        />
      </label>
      <label>
        Gender
        <input
          type="gender"
          onChange={(event) => setGender(event.currentTarget.value)}
        />
      </label>
      <label>
        Phone number
        <input
          type="phone number"
          onChange={(event) => setPhoneNumber(event.currentTarget.value)}
        />
      </label>

      <button>Create account</button>

      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          Error: {error.message}
        </div>
      ))}
    </form>
  );
}
