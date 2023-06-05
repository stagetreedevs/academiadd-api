/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from './cors.config';
import { initializeApp } from 'firebase/app';
async function bootstrap() {

  const corsConfig = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
  }

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC7ecIg42WzKomwtzTRsoqndlyYs0q3V-Y",
    authDomain: "academia-dos-doutores.firebaseapp.com",
    databaseURL: "https://academia-dos-doutores-default-rtdb.firebaseio.com",
    projectId: "academia-dos-doutores",
    storageBucket: "academia-dos-doutores.appspot.com",
    messagingSenderId: "1086551143335",
    appId: "1:1086551143335:web:49db2598789c4bc5363c82",
    measurementId: "G-7B3TCH9MT9"
  };
  initializeApp(firebaseConfig);

  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
