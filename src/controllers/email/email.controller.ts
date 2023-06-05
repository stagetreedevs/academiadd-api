/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer'
import { Controller, Get, Query } from '@nestjs/common';

@Controller('email')
export class EmailController {
    constructor(private mailService: MailerService) { }

    @Get('sendEmail')
    async textEmail(@Query('toEmail') toEmail, @Query('message') message) {
        return await this.mailService.sendMail({
            to: toEmail,
            from: 'apistagetree@gmail.com',
            subject: 'Nova senha Academia dos doutores',
            text: message
        });
    }
}
