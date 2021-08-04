import express from "express";
import {Response,Request,NextFunction} from 'express'
const router = express.Router();
/*import {
    createUser,
    fetchUser,
    updateUser,
    deleteUser
} from "../controllers/controller-test.js"*/
import controller from "../controllers/controller-test";
// console.log("RC : ",controller);
router.post("/users",controller.createUser);
router.get("/users",controller.fetchUser);
router.patch("/users",controller.updateUser);
router.delete("/users",controller.deleteUser);
router.get('/',(req:Request,res:Response)=>{
    // console.log(path.join(__dirname,'..',`index.html`));
    console.log("Connected");
    res.send("Connected");
    // res.sendFile(path.join(__dirname,"..",`index.html`));
});

export default {router};