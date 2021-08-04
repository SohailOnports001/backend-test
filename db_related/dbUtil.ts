// const { Pool } = require('pg');
import {Pool} from 'pg';
const config = require('../config').default.config;

// console.log("Config Loading",config)
const pgconfig = {
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
    host: config.db.host,
    port: config.db.port,
    max: config.db.max,
    ssl: config.db.ssl,
    idleTimeoutMillis: config.db.idleTimeoutMillis
}
// console.log("Config : ",pgconfig);
const pool:any = new Pool(pgconfig);

console.log(`DB Connection Settings: ${JSON.stringify(pgconfig)}`);

pool.on('error', function (err, client) {
    console.log(`idle client error, ${err.message} | ${err.stack}`);
});

//pool.query("LISTEN testingEvent");
// Listen notification
//pool.on('notification', async (data)=>{
   // const payload = JSON.parse(data.payload);
   // console.log("Row added!", payload);
//});
/* 
 * Single Query to Postgres
 * @param sql: the query for store data
 * @param data: the data to be stored
 * @return result
 */
const sqlToDB = async (sql:any, data:any) => {
    console.log(`sqlToDB() sql: ${sql} | data: ${data}`);
    try {
        let result = await pool.query(sql, data);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

/*
 * Retrieve a SQL client with transaction from connection pool. If the client is valid, either
 * COMMMIT or ROALLBACK needs to be called at the end before releasing the connection back to pool.
 */
const getTransaction = async () => {
    console.log(`getTransaction()`);
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        return client;
    } catch (error) {
        throw new Error(error.message);
    }
}

/* 
 * Execute a sql statment with a single row of data
 * @param sql: the query for store data
 * @param data: the data to be stored
 * @return result
 */
const sqlExecSingleRow = async (client:any, sql:any, data:any) => {
    console.log(`sqlExecSingleRow() sql: ${sql} | data: ${data}`);
    try {
        let result = await client.query(sql, data);
        console.log(`sqlExecSingleRow(): ${result.command} | ${result.rowCount}`);
        return result
    } catch (error) {
        console.log(`sqlExecSingleRow() error: ${error.message} | sql: ${sql} | data: ${data}`);
        throw new Error(error.message);
    }
}

/*
 * Execute a sql statement with multiple rows of parameter data.
 * @param sql: the query for store data
 * @param data: the data to be stored
 * @return result
 */
const sqlExecMultipleRows = async (client:any, sql:any, data:any) => {
    console.log(`inside sqlExecMultipleRows()`);
    let result = [];
    if (data.length !== 0) {
        for(let item of data) {
            try {
                console.log(`sqlExecMultipleRows() item: ${item}`);
                console.log(`sqlExecMultipleRows() sql: ${sql}`);
                let res = await client.query(sql, item);
                result.push(res.rows[0]);
            } catch (error) {
                console.log(`sqlExecMultipleRows() error: ${error}`);
                throw new Error(error.message);
            }
        }
    } else {
        console.log(`sqlExecMultipleRows(): No data available`);
        throw new Error('sqlExecMultipleRows(): No data available');
    }
    return result;
}

/*
 * Rollback transaction
 */
const rollback = async (client:any) => {
    if (typeof client !== 'undefined' && client) {
        try {
            console.log(`sql transaction rollback`);
            await client.query('ROLLBACK');
        } catch (error) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    } else {
        console.log(`rollback() not excuted. client is not set`);
    }
}

/*
 * Commit transaction
 */
const commit = async (client:any) => {
    try {
        await client.query('COMMIT');
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }
}

export default{
    sqlToDB,
    getTransaction,
    sqlExecMultipleRows,
    sqlExecSingleRow,
    rollback,
    commit
}