
const fileName = `controller-test`;
const testModel = require('../models/testModel');
const uuid = require("uuid");

module.exports.createUser = async (req,res)=>
{
    try
    {
        console.log(`${fileName} createUser() called`);
        let name = req.body.name||null;
        let phonenumber = req.body.phonenumber||null;
        let key = uuid.v4();
        let age = parseInt(req.body.age)||null;
        if(name!=null && phonenumber!=null && age!=null)
        {

            let details = await testModel.createUser(key,name,age,phonenumber);
            if(details.rowCount>0)
            {
                return res.status(200).json({
                status:`success`,
                message:`Successfully Done!`,
                statusCode:200,
                data:details.rows[0]
            })
            }
            else
            {
                return res.status(400).json({
                    status:`error`,
                    message:`Something went wrong!`,
                    statusCode:400,
                    data:[]
                })
            }
        }
        else
        {
            return res.status(404).json({
                status:`error`,
                message:`parameters not found!`,
                statusCode:404,
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log(`${fileName} createUser() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}

module.exports.fetchUser = async (req,res)=>
{
    try
    {
        console.log(`${fileName} fetchUser() called`);
        //console.log(req.query);
        let keys = Object.keys(req.query);
        let values = Object.values(req.query);
        let details = await testModel.fetchUser(keys, values);
        if(details.rowCount>0)
        {
            return res.status(200).json({
                status:`success`,
                message:`Successfully Done!`,
                statusCode:200,
                data:details.rows
            })
        }
        else
        {
            return res.status(400).json({
                status:`error`,
                message:`Something went wrong!`,
                statusCode:400,
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log(`${fileName} fetchUser() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}

module.exports.updateUser = async (req,res)=>
{
    try
    {
        console.log(`${fileName} updateUser() called`);
        //console.log(req.query);
        let keys = Object.keys(req.query);
        let values = Object.values(req.query);
        if(keys.length>1)
        {
            let details = await testModel.updateUser(keys, values);
            if(details.rowCount>0)
            {
                return res.status(200).json({
                    status:`success`,
                    message:`Successfully Done!`,
                    statusCode:200,
                    data:details.rows
                })
            }
            else
            {
                return res.status(400).json({
                    status:`error`,
                    message:`Something went wrong!`,
                    statusCode:400,
                    data:[]
                })
            }
        }
        else
        {
            return res.status(404).json({
                status:`error`,
                message:`parameters not found!`,
                statusCode:404,
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log(`${fileName} updateUser() ${error.message}`);
        return res.status(500).json({
            statusCode:500,
            status:`error`,
            message:error.message
        })
    }
}

module.exports.deleteUser = async (req,res)=>
{
    try
    {
        console.log(`${fileName} deleteUser() called`);
        let keys = Object.keys(req.query);
        let values = Object.values(req.query);
        // if(keys.length>0)
        // {

            let details = await testModel.deleteUser(keys, values);
            if(details.rowCount>0)
            {
                return res.status(200).json({
                status:`success`,
                message:`Successfully Done!`,
                statusCode:200,
                data:details.rows
            })
            }
            else
            {
                return res.status(400).json({
                    status:`error`,
                    message:`Something went wrong!`,
                    statusCode:400,
                    data:[]
                })
            }
        // }
        // else
        // {
        //     return res.status(404).json({
        //         status:`error`,
        //         message:`parameters not found!`,
        //         statusCode:404,
        //         data:[]
        //     })
        // }
    }
    catch(error)
    {
        console.log(`${fileName} deleteUser() ${error.message}`);
        return res.status(500).json({
            status:`error`,
            message:error.message,
            statusCode:500,
            data:[]
        })
    }
}