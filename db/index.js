import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgresql://ecommerce-api_owner:npg_pD9U2ihjqayb@ep-sweet-wind-a2k765br-pooler.eu-central-1.aws.neon.tech/ecommerce-api?sslmode=require', {
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
