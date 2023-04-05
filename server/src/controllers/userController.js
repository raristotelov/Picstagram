const { Router } = require('express');
const router = Router();

const { userService } = require('../services');
const verifyIdToken = require('../middlewares/verifyIdToken');

router.post('/signup', async (req, res) => {
    const userRecord = await userService.signUp(req.body);
	
    return res.json(userRecord);
});

router.post('/createdbuser', verifyIdToken, async (req, res) => {
    try {
        const status = await userService.createDbUser(req.body, res.uid);
        return res.json(status);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;
