import './logout.scss';
import React from 'react';
import { logout } from './actions';

export default function LogoutButton() {
  return (
    <form>
      <button className="logout-button" formAction={logout}>
        Logout
      </button>
    </form>
  );
}
