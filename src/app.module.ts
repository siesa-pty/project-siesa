import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { MulterModule } from '@nestjs/platform-express';
import { CompanyModule } from './company/company.module';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_SERV),
    UserModule,
    AuthModule,
    ProjectModule,
    MulterModule.register({
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
          cb(null, true);
        } else {
          cb(null, false);
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
    CompanyModule,
    RoleModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
