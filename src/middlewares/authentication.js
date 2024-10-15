const TokenManager = require('../utils/TokenManager');
const GenerateToken = require('../utils/TokenManager');
const authentication = (req, res, next) => {
  const token = req.header('Authorization');
  const tokenManager = new TokenManager();
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const accessToken = token.split(' ')[1];
  try {
    const userData = tokenManager.verifyAccessToken(accessToken);
    req.user = userData;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = authentication;