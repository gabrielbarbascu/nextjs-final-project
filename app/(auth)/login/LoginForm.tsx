'use client';
import './login.scss';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    //  This is not the secured way of doing returnTo
    // if (props.returnTo) {
    //   console.log('Checks Return to: ', props.returnTo);
    //   router.push(props.returnTo);
    // }

    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.username}`,
    );

    // revalidatePath() throws unnecessary error, will be used when stable
    // revalidatePath('/(auth)/login', 'page');
    router.refresh();
  }

  return (
    <div className="login-container">
      <form onSubmit={async (event) => await handleRegister(event)}>
        <div className="form-group">
          <label>
            USERNAME
            <input
              className="input-field"
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            PASSWORD
            <input
              className="input-field"
              type="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>
        </div>

        <button className="login-button">LOGIN</button>

        <p className="account-message">
          <a href="/register"> Don't have an account? Create one.</a>
        </p>

        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            Error: {error.message}
          </div>
        ))}
      </form>
    </div>
  );
}
