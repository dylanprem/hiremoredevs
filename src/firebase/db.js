import { db } from './firebase';

// User API

export const doCreateProfile = (uid) =>
  db.ref('Profiles').set({
    uid
  });

export const onceGetUsers = () =>
  db.ref('Profiles').once('value');