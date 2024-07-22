import { Request, Response, NextFunction } from "express";
import validateToken from "@/authentication/authSerivce";

const authorizationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = await validateToken(req.headers.authorization, res);

        res.locals.user = user;
        next();
    } catch {
        return;
    }
};

export default authorizationMiddleware;
