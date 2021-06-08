const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Post=mongoose.model("Post")
const requirelogin=require('../middleware/requirelogin')
const User=mongoose.model("User")

router.get('/users/:id',requirelogin,(req,res)=>{

    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err)
            return res.status(422).json({error:err})
            else
            res.json({user,posts})
        })

    }).catch(err=>{
        res.status(404).json ({error:"User not  found"})   
    })

})

router.put('/updatepic',requirelogin,(req,res)=>{
    User.findByIdAndUpdate(req.userinfo._id,{$set:{
        pic:req.body.pic
    }},{new:true},(err,result)=>{
        if(err)
        return res.status(422).json({error:"not posted"})
        else
        res.json(result)
    })
})


router.put('/follow',requirelogin,(req,res)=>{
    //console.log(req.body.followid)
    User.findByIdAndUpdate(req.body.followid,{
        $push:{followers:req.userinfo._id}},{new:true},
        (err,result)=>{
            if(err)
            return res.status(422).json({error:err})
        
     User.findByIdAndUpdate(req.userinfo._id,{
         $push:{following:req.body.followid}},
         {new:true}).select("-password").then(result=>res.json(result))
            .catch(err=>{
                return res.status(422).json({error:err})
            })        
     })

})

router.put('/unfollow',requirelogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowid,{
        $pull:{followers:req.userinfo._id}},{new:true},
        (err,result)=>{
            if(err)
            return res.status(422).json({error:err})
        
     User.findByIdAndUpdate(req.userinfo._id,{
         $pull:{following:req.body.unfollowid}},
         {new:true}).select("-password").then(result=>res.json(result))
            .catch(err=>{
                return res.status(422).json({error:err})
            })        
     })

    })

    module.exports=router