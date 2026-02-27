const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = function requireAuth(req, res, next) {
  const auth = req.headers.authorization?.split(' ');
  if (auth?.[0] !== 'Bearer' || !auth[1]) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const payload = jwt.verify(auth[1], JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
