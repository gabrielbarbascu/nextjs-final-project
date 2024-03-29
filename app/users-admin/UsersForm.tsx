'use client';
import './admin.scss';
import { useState } from 'react';
import { User } from '../../migrations/00000-createTableUsers';

type Props = {
  users: User[];
};

export default function UsersForm({ users }: Props) {
  const [userList, setUserList] = useState(users);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [onEditId, setOnEditId] = useState(0);
  const [onEditFirstNameInput, setOnEditFirstNameInput] = useState('');
  const [onEditLastNameInput, setOnEditLastNameInput] = useState('');
  const [onEditEmailInput, setOnEditEmailInput] = useState('');
  const [onEditPhoneNumberInput, setOnEditPhoneNumberInput] = useState('');
  const [onEditServiceInput, setOnEditServiceInput] = useState('');

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }
  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');
    const data = await fetch(
      'https://api.cloudinary.com/v1_1/djpycrkel/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  async function updateUserById(id: number) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: onEditFirstNameInput,
        lastName: onEditLastNameInput,
        email: onEditEmailInput,
        phoneNumber: onEditPhoneNumberInput,
        service: onEditServiceInput,
        secureUrl: imageSrc,
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
          className="admin-form"
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
            <div key={`user-inputs-${user.id}`} className="user-container">
              <input
                className="user-input"
                value={
                  user.id !== onEditId ? user.firstName : onEditFirstNameInput
                }
                onChange={(event) =>
                  setOnEditFirstNameInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
                placeholder="First Name"
              />
              <input
                className="user-input"
                value={
                  user.id !== onEditId ? user.lastName : onEditLastNameInput
                }
                onChange={(event) =>
                  setOnEditLastNameInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
                placeholder="Last Name"
              />
              <input
                className="user-input"
                value={user.id !== onEditId ? user.email : onEditEmailInput}
                onChange={(event) =>
                  setOnEditEmailInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
                placeholder="Email"
              />
              <input
                className="user-input"
                value={
                  user.id !== onEditId
                    ? user.phoneNumber
                    : onEditPhoneNumberInput
                }
                onChange={(event) =>
                  setOnEditPhoneNumberInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
                placeholder="Phone Number"
              />
              <input
                className="user-input"
                value={user.id !== onEditId ? user.service : onEditServiceInput}
                onChange={(event) =>
                  setOnEditServiceInput(event.currentTarget.value)
                }
                disabled={user.id !== onEditId}
                placeholder="Service"
              />
              {onEditId === user.id ? (
                <button
                  className="user-button save"
                  onClick={async () => {
                    await updateUserById(user.id);
                    setOnEditId(0);
                  }}
                >
                  SAVE
                </button>
              ) : (
                <button
                  className="user-button edit"
                  onClick={() => {
                    setOnEditFirstNameInput(user.firstName);
                    setOnEditLastNameInput(user.lastName);
                    setOnEditEmailInput(user.email);
                    setOnEditPhoneNumberInput(user.phoneNumber);
                    setOnEditServiceInput(user.service);

                    setOnEditId(user.id);
                  }}
                >
                  EDIT
                </button>
              )}
              <button
                className="user-button delete"
                onClick={async () => await deleteUserById(user.id)}
              >
                DELETE
              </button>
              <div>
                <form
                  className="upload-form"
                  method="post"
                  onChange={handleOnChange}
                  onSubmit={handleOnSubmit}
                >
                  <p>
                    <input type="file" name="file" className="file-input" />
                  </p>
                  <button className="upload-button">UPLOAD </button>
                </form>
              </div>
            </div>
          );
        })}
      </>
    </>
  );
}
