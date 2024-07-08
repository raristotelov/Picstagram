const { Router } = require('express');
const router = Router();

const { userService } = require('../services');

router.post('/sign-up', async (req, res) => {
    const userData = await userService.signUp(req.body);
	
    return res.json(userData);
});

router.post('/login', async (req, res) => {
    const userData = await userService.login(req.body);
	
    return res.json(userData);
});

router.get('/', async (req, res) => {
	const userId  = req.query.userId;

    const userAccountData = await userService.getUserAccoutData(userId);
	
    return res.json(userAccountData);
});

router.post('/update', async (req, res) => {
	const userId  = req.query.userId;

    const userAccountData = await userService.updateUserProfileData(userId, req.body);
	
    return res.json(userAccountData);
});

module.exports = router;
