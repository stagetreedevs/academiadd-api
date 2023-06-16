/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { getDatabase, ref, set, child, get, push, remove, update } from 'firebase/database';
import { Lawyer } from './lawyer';

@Injectable()
export class LawyerService {
  async create(lawyer: Lawyer): Promise<any> {
    const database = getDatabase();
    const lawyerRef = ref(database, 'lawyer');
    const newLawyerRef = push(lawyerRef);

    const lawyerData = {
      avatar: "https://firebasestorage.googleapis.com/v0/b/academia-dos-doutores.appspot.com/o/profile.png?alt=media&token=2a30ebe1-568e-4915-9d1a-cc619ed14dc1",
      id: newLawyerRef.key,
      email: lawyer.email,
      password: lawyer.password,
      type: lawyer.type,
      name: lawyer.name,
      phone: lawyer.phone,
      OAB: lawyer.OAB,
      person: lawyer.person,
      CPF: lawyer.CPF,
      CNPJ: lawyer.CNPJ,
      uf: lawyer.uf,
      city: lawyer.city,
      neighborhood: lawyer.neighborhood,
      street: lawyer.street,
      complement: lawyer.complement,
      cep: lawyer.cep,
      number: lawyer.number,
      creditCards: lawyer.creditCards !== undefined ? lawyer.creditCards : []
    };

    await set(newLawyerRef, lawyerData);
    
    return lawyerData;
  }

  async getAll(): Promise<any[]> {
    const database = getDatabase();
    const lawyerRef = ref(database, 'lawyer');

    const snapshot = await get(lawyerRef);

    if (snapshot.exists()) {
      const lawyers = [];
      snapshot.forEach((childSnapshot) => {
        const lawyer = childSnapshot.val();
        lawyers.push(lawyer);
      });
      return lawyers;
    }

    return [];
  }

  async getById(id: string): Promise<any> {
    const database = getDatabase();
    const lawyerRef = ref(database, `lawyer/${id}`);

    const snapshot = await get(lawyerRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  }

  async getByEmail(email: string): Promise<any> {
    const database = getDatabase();
    const lawyerRef = ref(database, 'lawyer');

    const snapshot = await get(lawyerRef);

    if (snapshot.exists()) {
      let lawyer = null;
      snapshot.forEach((childSnapshot) => {
        const lawyerData = childSnapshot.val();
        if (lawyerData.email === email) {
          lawyer = lawyerData;
        }
      });
      return lawyer;
    }

    return null;
  }

  async update(id: string, updates: Partial<Lawyer>): Promise<void> {
    const database = getDatabase();
    const lawyerRef = ref(database, `lawyer/${id}`);

    await update(lawyerRef, updates);
  }

  async delete(id: string): Promise<void> {
    const database = getDatabase();
    const lawyerRef = ref(database, `lawyer/${id}`);

    await remove(lawyerRef);
  }
}
