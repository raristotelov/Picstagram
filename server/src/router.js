const { Router } = require('express');
const router = Router();

const { userController, userPostController, commentController } = require('./controllers');

router.use('/users', userController);
router.use('/user-posts', userPostController);
router.use('/comments', commentController);

module.exports = router;
