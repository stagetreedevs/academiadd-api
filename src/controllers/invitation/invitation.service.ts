/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { getDatabase, ref, set, get, push, remove, query, orderByChild, equalTo, update } from 'firebase/database';
import { Invitation } from './invitation';

@Injectable()
export class InvitationService {
  async create(convite: Invitation): Promise<any> {
    const database = getDatabase();
    const ConviteRef = ref(database, 'invitation');
    const newConvite = push(ConviteRef);

    const ptData = {
      id: newConvite.key,
      group_name: convite.group_name,
      group_id: convite.group_id,
      user_name: convite.user_name,
      user_id: convite.user_id,
      response: null,
      message: convite.message,
      created_at: new Date().toISOString(),
    };

    await set(newConvite, ptData);
    return ptData;
  }

  async getAll(): Promise<any[]> {
    const database = getDatabase();
    const invitationRef = ref(database, 'invitation');

    const snapshot = await get(invitationRef);

    if (snapshot.exists()) {
      const invitations = [];
      snapshot.forEach((childSnapshot) => {
        const invitation = childSnapshot.val();
        invitations.push(invitation);
      });
      return invitations;
    }

    return [];
  }

  async getById(id: string): Promise<any> {
    const database = getDatabase();
    const invitationRef = ref(database, `invitation/${id}`);

    const snapshot = await get(invitationRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  }

  async getAllByUserId(userId: string): Promise<any> {
    const database = getDatabase();
    const notRef = ref(database, 'invitation');
    const queryByUserId = query(notRef, orderByChild('user_id'), equalTo(userId));

    const snapshot = await get(queryByUserId);

    if (snapshot.exists()) {
      const notifications = [];
      snapshot.forEach((childSnapshot) => {
        const notification = childSnapshot.val();
        notifications.push(notification);
      });
      return notifications;
    }

    return [];
  }

  async delete(id: string): Promise<void> {
    const database = getDatabase();
    const invitationRef = ref(database, `invitation/${id}`);

    await remove(invitationRef);
  }

  async confirm(id: string): Promise<void> {
    const database = getDatabase();
    const notRef = ref(database, `invitation/${id}`);
  
    await update(notRef, { response: true });  
  }

  async refuse(id: string): Promise<void> {
    const database = getDatabase();
    const notRef = ref(database, `invitation/${id}`);
  
    await update(notRef, { response: false });  
  }
}
