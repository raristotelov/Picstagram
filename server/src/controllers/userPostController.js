const { Router } = require('express');
const router = Router();

const { userPostService } = require('../services');
const verifyJwtToken = require('../middlewares/verifyJwtToken');

router.post('/add', verifyJwtToken,  async (req, res) => {
    const userPostData = await userPostService.addUserPost(req.body, res._id);
	
    return res.json(userPostData);
});

module.exports = router;