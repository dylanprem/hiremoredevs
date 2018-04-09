import { db } from './firebase';

// User API

export const createProfile = (uid) =>
  db.ref('Profiles').push({
    uid
  });

export const onceGetUsers = () =>
  db.ref('Profiles').once('value');