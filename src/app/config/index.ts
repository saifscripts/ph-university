import 'dotenv/config';

export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    db_uri: process.env.DB_URI,
    default_password: process.env.DEFAULT_PASSWORD,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_exp_in: process.env.JWT_ACCESS_EXP_IN,
    jwt_refresh_exp_in: process.env.JWT_REFRESH_EXP_IN,
};
