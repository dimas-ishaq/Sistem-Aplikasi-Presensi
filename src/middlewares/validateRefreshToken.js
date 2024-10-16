const TokenManager = require('../utils/TokenManager')
const validateRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken
  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  try {
    const tokenManager = new TokenManager()
    const userData = tokenManager.verifyRefreshToken(refreshToken)
    req.user = userData
    next()
  } catch (error) {
    if (error.message === 'jwt expired') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = validateRefreshToken