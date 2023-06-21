/* eslint-disable prettier/prettier */
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './controllers/email/email.controller';
import { AdminModule } from './controllers/admin/admin.module';
import { UserModule } from './controllers/user/user.module';
import { LawyerModule } from './controllers/lawyer/lawyer.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PetitionModule } from './controllers/petition/petition.module';
import { GroupModule } from './controllers/group/group.module';
import { NoticiationModule } from './controllers/notification/notification.module';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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'
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    JwtModule.register({
      secret: 'mySecretKey',
      signOptions: { expiresIn: '24h' },
    }),
    NoticiationModule,
    GroupModule,
    PetitionModule,
    AuthModule,
    AdminModule,
    UserModule,
    LawyerModule,
  ],
  controllers: [
    EmailController,
    AppController
  ],
  providers: [AppService, AuthService],
})
export class AppModule { }