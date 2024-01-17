import { databaseConfig } from '@config';
import { WorkModule, UserModule } from '@module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    UserModule,
    WorkModule,
  ],
})
export class AppModule {}
