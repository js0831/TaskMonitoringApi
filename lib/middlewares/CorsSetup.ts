export const corsSetup = (req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH, DELETE, GET');
    
    if(req.method === "OPTIONS"){
        req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    }
    next();
}
