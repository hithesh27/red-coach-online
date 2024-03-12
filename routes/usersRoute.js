const router =require('express').Router();
const authMiddleware=require('../middleware/Auth');
//register user
const User=require('../models/usersModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
router.post('/register', async (req,res) => {
    console.log('registerroute',req.body);
        try{
            const existingUser=await User.findOne({email : req.body.email});
            console.log('findone')
            if(existingUser){
                res.send({
                    message:'user alraedy exists',
                    success: false,
                    data:null
                })
            }
            const hashedPassword=await bcrypt.hash(req.body.password,10);
            //console.log(req.body,'check');

            req.body.password=hashedPassword;
            const newUser=new User(req.body);

            await newUser.save();
            res.send({
                message:'user created successfully',
                success:true,
                data :null
            })
           
        }
        catch(error){
            res.send({
                message:error.message,
                success:false,
                data :null
            })
        }
});
router.post('/login',async (req,res)=>{
    try{
        const  userExists=await User.findOne({email:req.body.email});
        console.log(userExists);
        if(!userExists){
         return    res.send({
                message:'user not present',
                success:false,
                data:null
            })
        }
       
        const checkPassword=await bcrypt.compare(req.body.password,userExists.password);
        if(!checkPassword){
            return res.send({
                message:'password incorrect',
                success:false,
                data:null
            })
        }
        const jwt_token=jwt.sign({userId:userExists._id},process.env.jwt_secret,{
            expiresIn:'1d'
        })
        res.send({
            message:'loggedin successfully',
            success:true,
            data:jwt_token
        })
        console.log('got token')
    }catch(error){
        res.send({
            message:error.message,
            success:false,
            data:null
        })
    }
})
router.post('/get-user-by-id',authMiddleware,async (req,res)=>{
  console.log('userRoute');
   try{
    const userId = req.body.userId; // Potential issue
    //const userExists = await User.findById(userId); // Use userId instead of req.body.userId
   // console.log(userExists)
    res.send({
        data:null,
        message:'user fetched successfully',
        success:true
    })
}catch(error){
        res.send({
            data:null,
            message:error.message,
            success:false
        })
}
})
module.exports=router