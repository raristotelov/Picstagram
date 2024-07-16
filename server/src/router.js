const { Router } = require('express');
const router = Router();

const { usersController, userPostController } = require('./controllers');

router.use('/users', usersController);
router.use('/user-posts', userPostController);

module.exports = router;