/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { getDatabase, ref, set, child, get, push, remove, update } from 'firebase/database';
import { User } from './user';

@Injectable()
export class UserService {
  async createUser(user: User): Promise<any> {
    const database = getDatabase();
    const userRef = ref(database, 'user');
    const newUserRef = push(userRef);

    const userData = {
      avatar: user.avatar !== undefined ? user.avatar : "",
      id: newUserRef.key,
      email: user.email,
      password: user.password,
      name: user.name,
      phone: user.phone,
      person: user.person,
      CPF: user.CPF,
      CNPJ: user.CNPJ,
      uf: user.uf,
      city: user.city,
      neighborhood: user.neighborhood,
      street: user.street,
      complement: user.complement,
      cep: user.cep,
      number: user.number
    };

    await set(newUserRef, userData);
    return userData;
  }

  async getAllUsers(): Promise<any[]> {
    const database = getDatabase();
    const userRef = ref(database, 'user');

    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        users.push(user);
      });
      return users;
    }

    return [];
  }

  async getUserById(id: string): Promise<any> {
    const database = getDatabase();
    const userRef = ref(database, `user/${id}`);

    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  }

  async getUserByEmail(email: string): Promise<any> {
    const database = getDatabase();
    const userRef = ref(database, 'user');

    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      let user = null;
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        if (userData.email === email) {
          user = userData;
        }
      });
      return user;
    }

    return null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<void> {
    const database = getDatabase();
    const userRef = ref(database, `user/${id}`);

    await update(userRef, updates);
  }

  async deleteUser(id: string): Promise<void> {
    const database = getDatabase();
    const userRef = ref(database, `user/${id}`);

    await remove(userRef);
  }
}
