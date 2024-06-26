import 'dotenv/config';

export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    db_uri: process.env.DB_URI,
    default_password: process.env.DEFAULT_PASSWORD,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
