const jsonwebtoken = require('jsonwebtoken');
const util = require('util');

const signToken = util.promisify(jsonwebtoken.sign);
const verifyToken = util.promisify(jsonwebtoken.verify);

class JwtProvider {
  constructor({ secretKey }) {
    this.secretKey = secretKey;
    this.defaultAudience = 'faz-um-bem-WEBCLIENT';
    this.defaultIssuer = 'faz-um-bem-API';
  }

  sign({ payload, options = {} }) {
    return signToken(
      payload,
      this.secretKey,
      {
        audience: this.defaultAudience,
        expiresIn: '1h',
        issuer: this.defaultIssuer,
        ...options,
      },
    );
  }

  verify({ token, options = {} }) {
    return verifyToken(
      token,
      this.secretKey,
      {
        audience: this.defaultAudience,
        issuer: this.defaultIssuer,
        ...options,
      },
    );
  }

  decode({ token, options = {} }) {
    return jsonwebtoken.decode(token, options);
  }
}

module.exports = JwtProvider;
