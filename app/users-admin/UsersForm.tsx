'use client';

import Head from 'next/head';
import { useState } from 'react';
import { User } from '../../migrations/00000-createTableUsers';
import Cloud from '../cloudinary';

type Props = {
  users: User[];
};

export default function UsersForm({ users }: Props) {
  const [userList, setUserList] = useState(users);
  {
    /*const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
const [serviceInput, setServiceInput] = useState(''); */
  }

  //add upload function for admin

  const [onEditId, setOnEditId] = useState(0);
  const [onEditFirstNameInput, setOnEditFirstNameInput] = useState('');
  const [onEditLastNameInput, setOnEditLastNameInput] = useState('');
  const [onEditEmailInput, setOnEditEmailInput] = useState('');
  const [onEditPhoneNumberInput, setOnEditPhoneNumberInput] = useState('');
  const [onEditServiceInput, setOnEditServiceInput] = useState('');

  async function updateUserById(id: number) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: onEditFirstNameInput,
        lastName: onEditLastNameInput,
        email: onEditEmailInput,
        phoneNumber: onEditPhoneNumberInput,
        service: onEditServiceInput,
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
          }}
        >
          ALEX POPA ADMIN
        </form>
      </div>

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
              <Cloud />
            </div>
          );
        })}
      </>
    </>
  );
}