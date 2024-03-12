const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    
    try{
        const token=req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).send({
                message:'auth failed',
                data:null,
                success:false
            })
        }
       const decode=jwt.verify(token,process.env.jwt_secret);
        req.body.userId=decode;
        next();
    }    
    catch(err){
        return res.status(401).send({
            message:'auth failed',
            data :null,
            success:true
        })
    }
}