const jwt = require('jsonwebtoken');
class TokenManager {
  constructor() { }

  async generateToken(id) {
    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }

  async verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  async generateAccessToken(id) {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' });
  }

}

module.exports = TokenManager