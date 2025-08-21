const { Router } = require('express');
const router = Router();

const { userController, userPostController } = require('./controllers');

router.use('/users', userController);
router.use('/user-posts', userPostController);

module.exports = router;