/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { getDatabase, ref, set, get, push, remove, update } from 'firebase/database';
import { Group } from './group';

@Injectable()
export class GroupService {
  async create(group: Group): Promise<any> {
    const database = getDatabase();
    const GroupRef = ref(database, 'group');
    const newGroupRef = push(GroupRef);

    const groupData = {
      id: newGroupRef.key,
      name: group.name,
      city: group.city,
      peticionante: group.peticionante,
      diligente: group.diligente,
      created_at: new Date().toISOString(),
    };

    await set(newGroupRef, groupData);
    return groupData;
  }

  async getAll(): Promise<any[]> {
    const database = getDatabase();
    const groupRef = ref(database, 'group');

    const snapshot = await get(groupRef);

    if (snapshot.exists()) {
      const groups = [];
      snapshot.forEach((childSnapshot) => {
        const group = childSnapshot.val();
        groups.push(group);
      });
      return groups;
    }

    return [];
  }

  async getById(id: string): Promise<any> {
    const database = getDatabase();
    const groupRef = ref(database, `group/${id}`);

    const snapshot = await get(groupRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  }

  async getByLawyerId(userId: string): Promise<any> {
    const database = getDatabase();
    const groupRef = ref(database, 'group');
  
    const snapshot = await get(groupRef);
  
    if (snapshot.exists()) {
      let group = null;
      snapshot.forEach((childSnapshot) => {
        const groupData = childSnapshot.val();
        if (
          groupData.peticionante.includes(userId) ||
          groupData.diligente.includes(userId)
        ) {
          group = groupData;
          return true; // Termina o loop forEach quando encontrar o grupo correspondente
        }
      });
  
      return group;
    }
  
    return null;
  }
  

  async update(id: string, updates: Partial<Group>): Promise<void> {
    const database = getDatabase();
    const groupRef = ref(database, `group/${id}`);

    await update(groupRef, updates);
  }

  async delete(id: string): Promise<void> {
    const database = getDatabase();
    const groupRef = ref(database, `group/${id}`);

    await remove(groupRef);
  }
}
