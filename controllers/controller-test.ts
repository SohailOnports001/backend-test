const fileName = `controller-test`;
import testModel from '../models/testModel';
import {v4} from 'uuid';
import {Request,Response,NextFunction} from 'express';

const createUser = async (req:Request,res:Response)=>
{
    try
    {
        console.log(`${fileName} createUser() called`);
        const name:string = req.body.name||null;
        const phonenumber:string = req.body.phonenumber||null;
        const key:string = v4();
        const age:any = parseInt(req.body.age)||null;
        if(name!=null && phonenumber!=null && age!=null)
        {

            let details:any = await testModel.createUser(key,name,age,phonenumber);
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

const fetchUser = async (req,res)=>
{
    try
    {
        console.log(`${fileName} fetchUser() called`);
        //console.log(req.query);
        let keys:any[] = Object.keys(req.query);
        let values:any[] = Object.values(req.query);
        let details:any = await testModel.fetchUser(keys, values);
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
            return res.status(200).json({
                status:`success`,
                message:`No User Found!`,
                statusCode:200,
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

const updateUser = async (req,res)=>
{
    try
    {
        console.log(`${fileName} updateUser() called`);
        //console.log(req.query);
        let keys:any[] = Object.keys(req.query);
        let values:any[] = Object.values(req.query);
        if(keys.length>1)
        {
            let details:any = await testModel.updateUser(keys, values);
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

const deleteUser = async (req,res)=>
{
    try
    { 
        console.log(`${fileName} deleteUser() called`);
        let keys:any[] = Object.keys(req.query);
        let values:any[] = Object.values(req.query);
        let details:any = await testModel.deleteUser(keys, values);
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
        console.log(`${fileName} deleteUser() ${error.message}`);
        return res.status(500).json({
            status:`error`,
            message:error.message,
            statusCode:500,
            data:[]
        })
    }
}

export default{
    createUser,
    fetchUser,
    updateUser,
    deleteUser
}