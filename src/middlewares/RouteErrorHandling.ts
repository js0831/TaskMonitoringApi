export const routeNotFound = (req, res, next) => {
    const error = new Error("Not Found");
    // error.status = 404;
    next(error);
}

export const routeError = (err,req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error:{
            message:err.message
        }
    })
}
 