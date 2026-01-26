const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const githubAuthController = require('../controllers/githubAuthController');
const authMiddleware = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.getProfile);

router.get('/github', githubAuthController.githubLogin);
router.get('/github/callback', githubAuthController.githubCallback);

module.exports = router;
