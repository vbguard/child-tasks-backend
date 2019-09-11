const mode = process.env.NODE_ENV === "production";

module.exports = {
  PORT: process.env.PORT || 5002,
  SERVER_URL_LOCAL: `http://localhost:${this.PORT}`,
  SERVER_URL_PROD: "",
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  JWT_SECRET_KEY: "Super secret key",
  GOOGLE_CLIENT_ID: "",
  GOOGLE_CLIENT_SECRET: "",
  GOOGLE_CB_URL: `${
    mode ? this.SERVER_URL_PROD : this.SERVER_URL_LOCAL
  }/auth/google/callback`,
  FACEBOOK_APP_ID: "3064327346927742",
  FACEBOOK_APP_SECRET: "8a52320db7bf759109b418377fb88c27",
  FACEBOOK_CB_URL: `${
    mode ? this.SERVER_URL_PROD : this.SERVER_URL_LOCAL
  }/auth/facebook/callback`
};
