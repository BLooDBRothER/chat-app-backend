import { Request, Response, NextFunction } from "express";

const logMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if(Number(res.statusCode) >= 400 && Number(res.statusCode) <= 599) {
        console.error(`[Endpoint]: API | -> ${req.url} | ${res.statusCode}`)
    }
    else {
        console.info(`[Endpoint]: API | -> ${req.url} | ${res.statusCode}`);
    }
    next();
};

export default logMiddleware;
