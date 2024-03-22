const jwt = require('jsonwebtoken');

function authAdmin(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'secretKey');
    if (decoded.user.isAdmin === false) return res.status(401).json({ message: 'Only admin can access this page' });
    req.user = decoded.user; // Attach user object to request for further use
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = authAdmin;