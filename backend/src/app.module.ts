import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';

require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_SERV),
    UserModule,
    AuthModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
