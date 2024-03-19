
function authorizePermissions(permissions) {
    return (req, res, next) => {
      const userRole = req.user.role;

      if (!userRole || !userRole.some(permission => permissions.includes(permission))) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }
      next();
    };
  }
  
  module.exports = authorizePermissions;