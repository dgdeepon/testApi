
const jwt=require('jsonwebtoken');

const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const decode=jwt.verify(token.split(' ')[1],'userLogin');
        if(decode){
            req.body.id=decode.id;
            next();
        }else{
            res.status(501).send({"error":"invalid token"});
        }
    }else{
        res.status(401).send({"failed":"please login!"});
    };
};

module.exports=auth;