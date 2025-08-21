const { Router } = require('express');
const router = Router();

const { userPostService } = require('../services');
const verifyJwtToken = require('../middlewares/verifyJwtToken');

router.get('/', verifyJwtToken,  async (req, res) => {
    const userPostsData = await userPostService.getAllUserPosts(res._id);
	
    return res.json(userPostsData);
});

router.post('/', verifyJwtToken,  async (req, res) => {
    const userPostData = await userPostService.addUserPost(req.body, res._id);
	
    return res.json(userPostData);
});

router.get('/followed-users-posts', verifyJwtToken, async (req, res) => {
    const followedUsersPostsData = await userPostService.getFollowedUsersPosts(res._id);
	
    return res.json(followedUsersPostsData);
});

module.exports = router;