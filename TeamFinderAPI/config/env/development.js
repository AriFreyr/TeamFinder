export default {
  env: 'development',
  username: 'teamfinder',
  password: 'securepw',
  database: 'teamfinder',
  postgresSettings: {
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  },
  jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
  port: 3000
};
