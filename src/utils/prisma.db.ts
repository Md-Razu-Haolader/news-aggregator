import { Prisma as MysqlPrisma, PrismaClient as MysqlClient } from 'generated/prisma/mysql-client'; // mysql
import { Prisma as MongodbPrisma, PrismaClient as MongodbClient } from 'generated/prisma/mongodb-client'; // mongodb
import Container from 'typedi';
import dotenv from 'dotenv';

function getDsn(connectionType: string): string {
  return connectionType == 'mongodb' ? getMongoConnectionStr() : getMysqlConnectionStr();
}
function getMysqlConnectionStr(): string {
  let dsn: string;

  if (process.env.NODE_ENV !== 'test') {
    dotenv.config();
    dsn = `${process.env.DB_CLIENT}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
  } else {
    dotenv.config({ path: '.env.test' });
    dsn = `${process.env.DB_CLIENT}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.TEST_DB_NAME}`;
  }

  return dsn;
}
function getMongoConnectionStr(): string {
  let dsn: string;
  if (process.env.NODE_ENV !== 'test') {
    dotenv.config();

    dsn = `mongodb://${process.env.NOSQL_DB_USERNAME}:${process.env.NOSQL_DB_PASSWORD}@${process.env.NOSQL_DB_HOST}:${process.env.NOSQL_DB_PORT}/${process.env.NOSQL_DB_NAME}?${process.env.NOSQL_DB_OPTION}`;
  } else {
    dotenv.config({ path: '.env.test' });
    dsn = `mongodb://${process.env.NOSQL_DB_USERNAME}:${process.env.NOSQL_DB_PASSWORD}@${process.env.NOSQL_DB_HOST}:${process.env.NOSQL_DB_PORT}/${process.env.TEST_DB_NAME}`;
  }

  return dsn;
}

type PrismaClient = MysqlClient | MongodbClient;
type PrismaClientOptions = MysqlPrisma.PrismaClientOptions | MongodbPrisma.PrismaClientOptions;

function getPrismaConfig(dsn: string): PrismaClientOptions {
  return {
    datasources: {
      db: { url: dsn },
    },
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  };
}

export const prisma = (connectionType = 'mysql'): PrismaClient => {
  const dsn = getDsn(connectionType);
  const prismaConfig = getPrismaConfig(dsn);
  if (connectionType == 'mysql') {
    if (Container.has(MysqlClient)) return Container.get(MysqlClient);
    const client = new MysqlClient(prismaConfig as MysqlPrisma.PrismaClientOptions);
    Container.set(MysqlClient, client);
    return client;
  } else {
    if (Container.has(MongodbClient)) return Container.get(MongodbClient);
    const client = new MongodbClient(prismaConfig as MongodbPrisma.PrismaClientOptions);
    Container.set(MongodbClient, client);
    return client;
  }
};
