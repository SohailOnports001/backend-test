// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config();
const config = {
    serviceName: process.env.SERVICENAME || 'PostgresDB',
    port: process.env.PORT || 3000,
    loggerLevel: process.env.LOGGERLEVEL || 'debug',
    db:{
        user: process.env.DB_USER || '',
        database: process.env.DB || '',
        password: process.env.DB_PASS || '',
        host: process.env.DB_HOST || '',
        port: parseInt(process.env.DB_PORT) || 5432,
        max: parseInt(process.env.DB_MAX_CLIENTS) || 75000,
        ssl: { rejectUnauthorized: false },
        idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS) || 30000
    }
}

export default {config}
// exports = {config};