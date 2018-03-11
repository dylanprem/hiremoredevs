import { db } from './firebase';

// User API

export const doCreateUser = (id, displayName, email) =>
  db.ref(`users/${id}`).set({
    displayName,
    email
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');