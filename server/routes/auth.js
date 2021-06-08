const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')
const requirelogin=require('../middleware/requirelogin')
router.get('/',(req,res)=>{
    res.send("hello")
})

/*router.get('/protected',requirelogin,(req,res)=>{


    res.send("hello user")
})*/
router.post('/signup',(req,res)=>{
//console.log(req.body)
const{name,email,password,pic}=req.body
if(!email || !password || !name)
return res.status(422).json({"error":"please add all fields"})

User.findOne({email:email}).then((saveduser)=>{
if(saveduser)
return res.status(422).json({error:"user exists"})

    bcrypt.hash(password,12)
    .then((hashedpassword)=>{

             const user=new User({
            email,password:hashedpassword,name,
            pic
                            })
            user.save()
            .then((user)=>{
            res.json({message:"saved successfully"})
            })
            .catch(err=>{
            console.log(err)
            })

        })
        .catch(err=>{
        console.log(err)
        })
})
})

router.post('/signin',(req,res)=>{

    const {email,password}=req.body
   if(!email || !password) 
   return  res.status(422).json({error:"please add all fields"})

   User.findOne({email:email}).then(saveduser=>{
    if(!saveduser)
    return res.status(422).json({error:"Invalid user or password"})
   bcrypt.compare(password,saveduser.password).then(Domatch=>{
       if(Domatch){
       //res.json({message:"Succesfully signed in"})
       const token=jwt.sign({_id:saveduser._id},JWT_SECRET)
      const {_id,name,email,pic,followers,following}=saveduser
       res.json({token,user:{_id,name,email,pic,followers,following}})
    }
       else
       return res.status(422).json({error:"Invalid user or  password "})
   }).catch(err=>{
       console.log(err)
   })
    
})
})
module.exports=router