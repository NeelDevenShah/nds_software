var jwt=require("jsonwebtoken");
const JWT_SECRET="8989898NDS";

const fetchuser=(req, res, next)=>{
    //Get the employeeId and companyId from jwt token and add id to request object
    const token=req.header("auth-token")
    if(!token)
    {
        res.status(404).send({error: "Please authenticate using valid token"});
    }

    const data=jwt.verify(token, JWT_SECRET);
    req.details=data.details;
    next();
}

module.exports=fetchuser;