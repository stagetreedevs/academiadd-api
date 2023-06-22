/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { getDatabase, ref, set, get, push, remove, orderByChild, query, equalTo, update } from 'firebase/database';
import { Notification } from './notification';

@Injectable()
export class NotificationService {
  async create(notifi: Notification): Promise<any> {
    const database = getDatabase();
    const notRef = ref(database, 'notification');
    const newNotRef = push(notRef);

    const notData = {
      id: newNotRef.key,
      issuer_id: notifi.issuer_id,
      issuer_name: notifi.issuer_name,
      receiver_id: notifi.receiver_id,
      receiver_name: notifi.receiver_name,
      type: notifi.type,
      message: notifi.message,
      read: false,
      date: new Date().toISOString(),
    };

    await set(newNotRef, notData);

    return notData;
  }

  async getAll(): Promise<any[]> {
    const database = getDatabase();
    const notRef = ref(database, 'notification');

    const snapshot = await get(notRef);

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

  async getById(id: string): Promise<any> {
    const database = getDatabase();
    const notRef = ref(database, `notification/${id}`);

    const snapshot = await get(notRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  }

  async getAllByReceiverId(receiverId: string): Promise<any> {

    const database = getDatabase();
    const notRef = ref(database, 'notification');
    const queryByUserId = query(notRef, orderByChild('receiver_id'), equalTo(receiverId));

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

  async getUnreadByReceiverId(receiverId: string): Promise<any[]> {
    const database = getDatabase();
    const notRef = ref(database, 'notification');
    const queryByReceiverId = query(notRef, orderByChild('receiver_id'), equalTo(receiverId));

    const snapshot = await get(queryByReceiverId);

    if (snapshot.exists()) {
      const notifications = snapshot.val();
      const filteredNotifications = Object.values(notifications).filter(
        (notification: any) => notification.receiver_id === receiverId && notification.read === false
      );

      return filteredNotifications;
    }

    return [];
  }

  async update(id: string, updates: Partial<Notification>): Promise<void> {
    const database = getDatabase();
    const notRef = ref(database, `notification/${id}`);

    await set(notRef, updates);
  }

  async read(id: string): Promise<void> {
    const database = getDatabase();
    const notRef = ref(database, `notification/${id}`);

    await update(notRef, { read: true });
  }

  async delete(id: string): Promise<void> {
    const database = getDatabase();
    const notRef = ref(database, `notification/${id}`);

    await remove(notRef);
  }
}
