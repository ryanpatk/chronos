import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UrlScraperModule } from './url-scraper/url-scraper.module';
import { AppController } from './app.controller';
import { SpacesModule } from './spaces/spaces.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TodoModule,
    AuthModule,
    UsersModule,
    UrlScraperModule,
    SpacesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
