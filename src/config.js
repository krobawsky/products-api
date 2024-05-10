
export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/services",
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
