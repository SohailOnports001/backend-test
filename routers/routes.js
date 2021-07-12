const router = require('express').Router();
const controllerTest = require('../controllers/controller-test');

router.post("/users",controllerTest.createUser);
router.get("/users",controllerTest.fetchUser);
router.patch("/users",controllerTest.updateUser);
router.delete("/users",controllerTest.deleteUser);

module.exports = router;