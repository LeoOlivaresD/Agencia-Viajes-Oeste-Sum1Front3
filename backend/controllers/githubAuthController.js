const axios = require('axios');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { findUserByEmail, addUser, updateUser } = require('../utils/fileHandler');

const githubLogin = (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`;
  res.json({ url: githubAuthUrl });
};

const githubCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_code`);
  }

  try {
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_token`);
    }

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const githubUser = userResponse.data;

    let email = githubUser.email;
    if (!email) {
      const emailsResponse = await axios.get('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      const primaryEmail = emailsResponse.data.find(e => e.primary);
      email = primaryEmail ? primaryEmail.email : emailsResponse.data[0].email;
    }

    let user = findUserByEmail(email);

    if (user) {
      updateUser(user.id, {
        name: githubUser.name || githubUser.login,
        avatar: githubUser.avatar_url,
        githubId: githubUser.id,
        lastLogin: new Date().toISOString()
      });
      user = { ...user, name: githubUser.name || githubUser.login, avatar: githubUser.avatar_url };
    } else {
      user = {
        id: uuidv4(),
        email,
        name: githubUser.name || githubUser.login,
        avatar: githubUser.avatar_url,
        githubId: githubUser.id,
        authMethod: 'github',
        createdAt: new Date().toISOString()
      };
      addUser(user);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error('Error en GitHub OAuth:', error.response?.data || error.message);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=github_auth_failed`);
  }
};

module.exports = {
  githubLogin,
  githubCallback
};
