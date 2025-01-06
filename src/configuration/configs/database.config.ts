import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', (): TypeOrmModuleOptions => {
  const options: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['dist/**/entities/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'local',
    // logging: true,
    ssl: process.env.NODE_ENV !== 'local',
  };
  //   console.log(options);
  return options;
});
