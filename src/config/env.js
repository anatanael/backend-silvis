require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,

  EVOLUTION: {
    URL: process.env.EVOLUTION_URL,
    API_KEY: process.env.EVOLUTION_API_KEY,
    INSTANCE: process.env.EVOLUTION_INSTANCE,
  },
};
