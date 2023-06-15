/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { getDatabase, ref, set, get, push, remove, update } from 'firebase/database';
import { Petition } from './petition';

@Injectable()
export class PetitionService {
  async create(pt: Petition): Promise<any> {
    const database = getDatabase();
    const PetitionRef = ref(database, 'petition');
    const newPetitionRef = push(PetitionRef);

    const ptData = {
      id: newPetitionRef.key,
      numeroProcesso: pt.numeroProcesso,
      requerente: pt.requerente,
      requerido: pt.requerido,
      textoPeticao: pt.textoPeticao,
      grupo: pt.grupo,
      anexos: pt.anexos,
      accepted: false,
      evaluation: pt.evaluation,
      state: pt.state,
      city: pt.city,
      created_at: new Date().toISOString(),
      time_limit: pt.time_limit
    };

    await set(newPetitionRef, ptData);
    return ptData;
  }

  async getAll(): Promise<any[]> {
    const database = getDatabase();
    const petitionRef = ref(database, 'petition');

    const snapshot = await get(petitionRef);

    if (snapshot.exists()) {
      const petitions = [];
      snapshot.forEach((childSnapshot) => {
        const petition = childSnapshot.val();
        petitions.push(petition);
      });
      return petitions;
    }

    return [];
  }

  async getById(id: string): Promise<any> {
    const database = getDatabase();
    const petitionRef = ref(database, `petition/${id}`);

    const snapshot = await get(petitionRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  }

  async update(id: string, updates: Partial<Petition>): Promise<void> {
    const database = getDatabase();
    const petitionRef = ref(database, `petition/${id}`);

    await update(petitionRef, updates);
  }

  async delete(id: string): Promise<void> {
    const database = getDatabase();
    const petitionRef = ref(database, `petition/${id}`);

    await remove(petitionRef);
  }
}
