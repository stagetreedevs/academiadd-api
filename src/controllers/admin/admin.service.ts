/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { getDatabase, ref, set, child, get, push, remove, update } from 'firebase/database';
import { Admin } from './admin';

@Injectable()
export class AdminService {
  async createAdmin(admin: Admin): Promise<void> {
    const database = getDatabase();
    const adminRef = ref(database, 'admin');
    const newAdminRef = push(adminRef);

    const adminData = {
      id: newAdminRef.key,
      email: admin.email,
      password: admin.password,
    };

    await set(newAdminRef, adminData);
  }

  async getAllAdmins(): Promise<any[]> {
    const database = getDatabase();
    const adminRef = ref(database, 'admin');

    const snapshot = await get(adminRef);

    if (snapshot.exists()) {
      const admins = [];
      snapshot.forEach((childSnapshot) => {
        const admin = childSnapshot.val();
        admins.push(admin);
      });
      return admins;
    }

    return [];
  }

  async getAdminById(id: string): Promise<any> {
    const database = getDatabase();
    const adminRef = ref(database, `admin/${id}`);

    const snapshot = await get(adminRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  }

  async getAdminByEmail(email: string): Promise<any> {
    const database = getDatabase();
    const adminRef = ref(database, 'admin');

    const snapshot = await get(adminRef);

    if (snapshot.exists()) {
      let admin = null;
      snapshot.forEach((childSnapshot) => {
        const adminData = childSnapshot.val();
        if (adminData.email === email) {
          admin = adminData;
        }
      });
      return admin;
    }

    return null;
  }

  async updateAdmin(id: string, updates: Partial<Admin>): Promise<void> {
    const database = getDatabase();
    const adminRef = ref(database, `admin/${id}`);

    await update(adminRef, updates);
  }

  async deleteAdmin(id: string): Promise<void> {
    const database = getDatabase();
    const adminRef = ref(database, `admin/${id}`);

    await remove(adminRef);
  }
}
