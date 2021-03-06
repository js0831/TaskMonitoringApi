import * as jwt from 'jsonwebtoken';

export const TokenRouteGuard = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'process.env.JWT_KEY');
        req.userData = decoded;
        next();
    } catch (error) {
        const msg = req.headers.authorization ? 'Session Expired' : 'Authorization failed';
        return res.status(401).json({
            message:msg
        });
    }
};