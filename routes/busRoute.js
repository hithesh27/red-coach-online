const router=require('express').Router();
const Bus =require('../models/busModel')

router.post('/buses',async (req,res)=>{
    try{
        const existingBus=await Bus.findOne({number:req.body.number});
        if(existingBus){
            return res.send({
                success: 'false',
                message:'Bus already exists'
            })  
        }
        console.log(req.body)
        const newBus=new Bus(req.body);
        await newBus.save();
        return res.send({
            success:'true',
            message:'Bus saved successfully'
        })
    }
    catch(error){
        return res.send({
            success:'false',
            message:error.message
        })
    }
})

module.exports=router;