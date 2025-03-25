function authorizeRole(role) {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.sendStatus(403); // Forbidden
        }
        next();
    };
}

module.exports = authorizeRole;