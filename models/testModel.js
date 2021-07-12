const dbUtil = require("../db_related/dbUtil");
const {
   insertIntoTable,
   selectFromTable,
   updateTable
} = require('../db_related/queryUtil');
const fileName = 'testModel.js';

module.exports.createUser = async (key,name,age,phonenumber)=>
{
    console.log(`${fileName} createUser() called`)
    let sqlQuery = `INSERT INTO "User" (key,name,age,phonenumber) values($1,$2,$3,$4) returning *`;
    let data = [key,name,age,phonenumber];
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,data);
        await dbUtil.commit(client);
        return result;
    }
    catch(error)
    {
        console.log(`${fileName} createUser() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.fetchUser = async (keys,values)=>
{
    console.log(`${fileName} fetchUser() called`)
    let sqlQuery;
    if(keys.length > 0)
    {
        sqlQuery = `select * from "User" where ${keys[0]}=$1 and ${keys[1]}= $2`;
    }
    else
    {
        sqlQuery = `select * from "User"`;
    }
    let data = [];
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,values);
        await dbUtil.commit(client);
        return result;
    }
    catch(error)
    {
        console.log(`${fileName} fetchUser() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.updateUser = async (keys,values)=>
{
    console.log(`${fileName} updateUser() called`)
    let sqlQuery = `update "User" set ${keys[1]}= $2 where ${keys[0]}=$1`;
    let data = [];
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,values);
        await dbUtil.commit(client);
        return result;
    }
    catch(error)
    {
        console.log(`${fileName} updateUser() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}

module.exports.deleteUser = async (keys,values)=>
{
    console.log(`${fileName} deleteUser() called`)
    let sqlQuery;
    if(keys.length > 0)
    {
        sqlQuery = `delete from "User" where ${keys[0]}=$1 and ${keys[1]}=$2`;
    }
    else
    {
        sqlQuery = `delete from "User"`;
    }
    let data = [];
    let client = await dbUtil.getTransaction();
    try
    {
        let result = await dbUtil.sqlExecSingleRow(client,sqlQuery,values);
        await dbUtil.commit(client);
        return result;
    }
    catch(error)
    {
        console.log(`${fileName} deleteUser() ${error.message}`);
        await dbUtil.rollback(client);
        throw new Error(error.message);
    }
}