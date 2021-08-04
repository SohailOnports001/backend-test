import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";
import router from "./routers/routes";
const app = express();
const ROUTER = express.Router();
// console.log("R : ",router);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(ROUTER);
ROUTER.use("/",router.router);

app.listen(config.config.port,()=>{
    console.log('listening on port '+config.config.port);
});