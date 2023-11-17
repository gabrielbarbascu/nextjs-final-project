'use client';

// Import necessary modules and types
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

// Define the gender options
type Gender = 'Male' | 'Female';

export default function RegisterForm() {
  // State variables for form inputs
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [gender, setGender] = useState<Gender>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const router = useRouter();

  // Handle form submission
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
    router.refresh();
  }

  // Render the form
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
          type="text"
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </label>
      <label>
        Last name
        <input
          type="text"
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </label>
      <label>
        Date of birth
        <input
          type="date"
          onChange={(event) => setDateOfBirth(event.currentTarget.value)}
        />
      </label>
      <label>
        Gender
        <select
          onChange={(event) => setGender(event.currentTarget.value as Gender)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <label>
        Phone number
        <input
          type="tel"
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
