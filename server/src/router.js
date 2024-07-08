const { Router } = require('express');
const router = Router();

const { userController, userPostController } = require('./controllers');

router.use('/user', userController);
router.use('/user-posts', userPostController);

module.exports = router;