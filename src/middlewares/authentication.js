const TokenManager = require('../utils/TokenManager');

const authentication = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const accessToken = authHeader.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const tokenManager = new TokenManager();
    const userData = tokenManager.verifyAccessToken(accessToken);
    req.user = userData;
    next();
  } catch (error) {
    if (error.message === 'jwt expired') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  };
}

module.exports = authentication
