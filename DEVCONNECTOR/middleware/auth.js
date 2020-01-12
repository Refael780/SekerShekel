const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const reciveToken = req.header('x-auth-token');
  console.log(reciveToken);

  if (!reciveToken) {
    res.status(401).json({ msg: 'No Token, Authrezation denied' });
  }

  try {
    console.log('try to verify token');

    const decodedToken = jwt.verify(reciveToken, config.get('jwtSecret'));
    console.log('suc verify token');

    req.user = decodedToken.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Auth faild invalid token' });
  }
};
