'use client';
import { useState } from 'react';
import { User } from '../../migrations/00000-createTableUsers';
import FileUpload from '../components/FileUpload';

type Props = {
  users: User[];
};

export default function UsersForm({ users }: Props) {
  const [userList, setUserList] = useState(users);
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [serviceInput, setServiceInput] = useState('');
  //add upload function for admin

  const [onEditId, setOnEditId] = useState(0);
  const [onEditFirstNameInput, setOnEditFirstNameInput] = useState('');
  const [onEditLastNameInput, setOnEditLastNameInput] = useState('');
  const [onEditEmailInput, setOnEditEmailInput] = useState('');
  const [onEditPhoneNumberInput, setOnEditPhoneNumberInput] = useState('');
  const [onEditServiceInput, setOnEditServiceInput] = useState('');

  async function createUser() {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        phoneNumber: phoneNumberInput,
        service: serviceInput,
      }),
    });

    const data = await response.json();

    setUserList([...userList, data.user]);
  }

  async function updateUserById(id: number) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: onEditFirstNameInput,
        lastName: onEditLastNameInput,
        email: onEditEmailInput,
        phoneNumber: onEditPhoneNumberInput,
        service: serviceInput,
      }),
    });

    const data = await response.json();

    setUserList(
      userList.map((user) => {
        if (user.id === data.user.id) {
          return data.user;
        }
        return user;
      }),
    );
  }

  async function deleteUserById(id: number) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    setUserList(userList.filter((user) => user.id !== data.user.id));
  }

  return (
    <>
      <div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await createUser();
          }}
        >
          <label>
            First Name:
            <input
              value={firstNameInput}
              onChange={(event) => setFirstNameInput(event.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              value={lastNameInput}
              onChange={(event) => setLastNameInput(event.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              value={emailInput}
              onChange={(event) => setEmailInput(event.currentTarget.value)}
            />
          </label>
          <label>
            Phone Number:
            <input
              value={phoneNumberInput}
              onChange={(event) =>
                setPhoneNumberInput(event.currentTarget.value)
              }
            />
          </label>
          <br />
          <label>
            Service:
            <input
              value={serviceInput}
              onChange={(event) => setServiceInput(event.currentTarget.value)}
            />
          </label>
          <br />
          <button>Create</button>
        </form>
      </div>
      <br />
      <>
        {userList.map((user) => {
          return (
            <div key={`user-inputs-${user.id}`}>
              <input
                value={
                  user.id !== onEditId ? user.firstName : onEditFirstNameInput
                }
                onChange={(event) =>
                  setOnEditFirstNameInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
              />
              <input
                value={
                  user.id !== onEditId ? user.lastName : onEditLastNameInput
                }
                onChange={(event) =>
                  setOnEditLastNameInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
              />
              <input
                value={user.id !== onEditId ? user.email : onEditEmailInput}
                onChange={(event) =>
                  setOnEditEmailInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
              />
              <input
                value={
                  user.id !== onEditId
                    ? user.phoneNumber
                    : onEditPhoneNumberInput
                }
                onChange={(event) =>
                  setOnEditPhoneNumberInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
              />
              <input
                value={user.id !== onEditId ? user.service : onEditServiceInput}
                onChange={(event) =>
                  setOnEditServiceInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
              />
              {onEditId === user.id ? (
                <button
                  onClick={async () => {
                    await updateUserById(user.id);
                    setOnEditId(0);
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOnEditFirstNameInput(user.firstName);
                    setOnEditLastNameInput(user.lastName);
                    setOnEditEmailInput(user.email);
                    setOnEditPhoneNumberInput(user.phoneNumber);
                    setOnEditServiceInput(user.service);
                    setOnEditId(user.id);
                  }}
                >
                  Edit
                </button>
              )}
              <button onClick={async () => await deleteUserById(user.id)}>
                Delete
              </button>
              <FileUpload />
            </div>
          );
        })}
      </>
    </>
  );
}
