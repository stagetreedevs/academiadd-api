/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/controllers/admin/admin.service';
import { UserService } from 'src/controllers/user/user.service';
import { LawyerService } from 'src/controllers/lawyer/lawyer.service';

@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService,
        private userService: UserService,
        private lawyerService: LawyerService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const userAdmin = await this.adminService.getAdminByEmail(email);
        const userUser = await this.userService.getUserByEmail(email);
        const userLaw = await this.lawyerService.getByEmail(email);

        if (userAdmin && pass === userAdmin.password) {
            const { password, ...result } = userAdmin;
            return { page: 'admin', ...result };
        } else if (userUser && pass === userUser.password) {
            const { password, ...result } = userUser;
            return { page: 'user', ...result };
        } else if (userLaw && pass === userLaw.password) {
            const { password, ...result } = userLaw;
            return { page: 'lawyer', ...result };
        }

        return null;
    }
}
