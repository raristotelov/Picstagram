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

module.exports = router;
