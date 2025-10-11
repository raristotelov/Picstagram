const { Router } = require('express');
const router = Router();

const { userPostService } = require('../services');
const verifyJwtToken = require('../middlewares/verifyJwtToken');

router.get('/', verifyJwtToken,  async (req, res) => {
    const userPostsData = await userPostService.getAllUserPosts(res.userId);
	
    return res.json(userPostsData);
});

router.post('/', verifyJwtToken,  async (req, res) => {
    const userPostData = await userPostService.addUserPost(req.body, res.userId);
	
    return res.json(userPostData);
});

router.get('/followed-users-posts', verifyJwtToken, async (req, res) => {
    const followedUsersPostsData = await userPostService.getFollowedUsersPosts(res.userId);
	
    return res.json(followedUsersPostsData);
});

router.post('/like/:userPostId', verifyJwtToken, async (req, res) => {
    const currentlyLoggedInUserId  = res.userId
    const userPostId  = req.params.userPostId;

    const userPostData = await userPostService.likeUserPost({ userPostId, userWhoLikedId: currentlyLoggedInUserId });

    return res.json(userPostData);
});

router.post('/unlike/:userPostId', verifyJwtToken, async (req, res) => {
    const currentlyLoggedInUserId  = res.userId
    const userPostId  = req.params.userPostId;

    const userPostData = await userPostService.unlikeUserPost({ userPostId, userWhoUnlikedId: currentlyLoggedInUserId });
    
    return res.json(userPostData);
});

module.exports = router;