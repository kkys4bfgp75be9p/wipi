export default {
    admin: {
        name: process.env.ADMIN_NAME || 'admin',
        password: process.env.ADMIN_PW || 'admin',
    },
    mysql: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PW || 'root',
        database: process.env.DB_NAME || 'wipi',
        charset: process.env.DB_CHARSET || 'utf8mb4',
    },
};
