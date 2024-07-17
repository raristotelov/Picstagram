const { Router } = require("express");
const router = Router();

const { usersService } = require("../services");

router.post("/sign-up", async (req, res) => {
    const userData = await usersService.signUp(req.body);
	
    return res.json(userData);
});

router.post("/login", async (req, res) => {
    const userData = await usersService.login(req.body);
	
    return res.json(userData);
});

router.get("/", async (req, res) => {
	const userIdsString = req.query.userIds;
	const searchWord = req.query.searchWord;

	const userIds = userIdsString?.split(",");

	let usersAccountData = [];

	if (userIds) {
		usersAccountData = await usersService.getUsersProfileDataByUserIds({ userIds });
	} else if (searchWord) {
		usersAccountData = await usersService.getUsersProfileDataBySearchWord({ searchWord });
	}

	return res.json(usersAccountData);
});

router.patch("/update/:userId", async (req, res) => {
	const userId  = req.params.userId;

    const userAccountData = await usersService.updateUserProfileData(userId, req.body);
	
    return res.json(userAccountData);
});

router.post("/:userId/follow/:userIdToFollow", async (req, res) => {
	const userId  = req.params.userId;
	const userIdToFollow  = req.params.userIdToFollow;

    const userAccountData = await usersService.followUser(userId, userIdToFollow);
	
    return res.json(userAccountData);
});

router.post("/:userId/unfollow/:userIdToUnfollow", async (req, res) => {
	const userId  = req.params.userId;
	const userIdToUnfollow  = req.params.userIdToUnfollow;

    const userAccountData = await usersService.unfollowUser(userId, userIdToUnfollow);
	
    return res.json(userAccountData);
});

module.exports = router;
