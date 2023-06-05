/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/controllers/user/user.module';
import { AdminModule } from 'src/controllers/admin/admin.module';
import { LawyerModule } from 'src/controllers/lawyer/lawyer.module';
@Module({
    imports: [
        AdminModule,
        UserModule,
        LawyerModule,
        JwtModule.register({
            secret: 'mySecretKey',
            signOptions: { expiresIn: '24h' },
        }),
    ],
    providers: [AuthService, LocalStrategy]
})
export class AuthModule { }