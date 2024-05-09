const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer TOKEN_STRING

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
  if (err) {
    return res.status(403).send('Invalid token');
  }
  req.user = { id: decodedToken.id }; // Extract and assign user ID
  next();
});
  } else {
    res.status(401).send('Authorization token required');
  }
};

module.exports = authMiddleware;
