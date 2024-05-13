
export default {
  PG_DB_HOST: "localhost",
  PG_DB_NAME: "haciendoladb",
  PG_DB_USER: "postgres",
  PG_DB_PASSWORD: "awdr",

  PORT: process.env.PORT || 3000,
  SECRET: 'haciendola-api',
  TOKEN_SESSION: 'x-access-token',
  TOKEN_SESSION_LIVE: 86400, // 24 hours
  TOKEN_CODE: 'x-code-token',
  TOKEN_CODE_LIVE: 600, // 10 min

  CODE_DIGITS: 100000, // 6 Digits
  USERNAME_LENGHT: 5,
  PASSWORD_LENGHT: 8
};
