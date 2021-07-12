const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const routes = require('./routers/routes');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(router);
router.use("/api",routes);

app.listen(config.port,()=>{
    console.log('listening on port '+config.port);
});