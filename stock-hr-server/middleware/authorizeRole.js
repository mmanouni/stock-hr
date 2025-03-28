module.exports = function authorizeRole(requiredRole) {
    return (req, res, next) => {
/*
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ message: "Forbidden - You don't have permission" });
        }
*/
        next();
    };
};