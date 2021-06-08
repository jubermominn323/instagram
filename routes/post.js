const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Post=mongoose.model("Post")
const requirelogin=require('../middleware/requirelogin')

router.get('/allposts',requirelogin,(req,res)=>{

Post.find().populate("postedBy","_id name")
.populate("comments.postedBy","_id name")
    
.then(allposts=>{
    res.json({allposts})
}).catch(err=>console.log(err))

})

router.get('/getsubposts',requirelogin,(req,res)=>{

    Post.find({postedBy:{$in:req.userinfo.following}}).populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
        
    .then(allposts=>{
        res.json({allposts})
    }).catch(err=>console.log(err))
    
    })
    



router.post('/createpost',requirelogin,(req,res)=>{
    const{title,body,pic}=req.body
    console.log(req.body)    
    if(!title || !body || !pic)
   return res.status(422).json({err:"please add all fields"})
   // console.log(req.userinfo)
    const post=new Post({

        title:title,
        body:body,
        photo:pic,
        postedBy:req.userinfo
    })
    post.save().then(result=>{res.json({post:result })}).catch(err=>console.log(err))
})


router.get('/myposts',requirelogin,(req,res)=>{
    //populate remaing
    Post.find({postedBy:req.userinfo._id})
    .then(myposts=>res.json({myposts}))
    .catch(err=>console.log(err))

})

router.post('/like',requirelogin,(req,res)=>{
console.log(req.body)
Post.findByIdAndUpdate(req.body.postId,{
$push:{likes:req.userinfo._id},
},{
    new:true
}).exec((err,result)=>{
    if(err)
    return res.status(422).json({error:err})
    else
    res.json(result)
})

})


router.put('/comment',requirelogin,(req,res)=>{
  //  console.log(req.body)
  const comment={
      text:req.body.text,
      postedBy:req.userinfo._id
  }  
  Post.findByIdAndUpdate(req.body.postId,{
    $push:{comments:comment},
    },{
        new:true
    }).populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    
    .exec((err,result)=>{
        if(err)
        return res.status(422).json({error:err})
        else
        res.json(result)
    })
    
    })
    
router.put('/unlike',requirelogin,(req,res)=>{

    Post.findByIdAndUpdate(req.body.postId,{
    $pull:{likes:req.userinfo._id},
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        return res.status(422).json({error:err})
        else
        res.json(result)
    })
    
    })

router.delete('/deletepost/:postId',requirelogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err|| !post)
        return res.status(422).json({error:err})
        if(post.postedBy._id.toString() ===req.user._id.toString() )
         post.remove()
         .then(result=>res.json(result))
            .catch((err=>console.log(err)))
        })
})
module.exports=router