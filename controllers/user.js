const  User=require('../module/user')

exports.postAddUser=async (req,res,next)=>{
    
    try{
        if(!req.body.phoneno){
            throw new error("phone number is mandotory")

        }

     const name=req.body.name
    const email=req.body.email
    const phoneno=req.body.phoneno
        let data=await User.create({name:name,phoneno:phoneno,email:email})
        res.status(201).json(data)

    }catch(err){
    res.status(500).json({error:err})
}
    
}
exports.getUsers=(req,res,next)=>{
    User.findAll().then((users)=>{
        res.status(200).json(users)
    }).catch(err=>{
        res.status(500).json({error:err})
    })

}
exports.deleteUser=(req,res,next)=>{
    const userId=req.params.id
    if(!userId){
        console.log("id is miising")
       return res.status(400).json({err:'id is missing'})

    }
    User.destroy({
        where:{
            id:userId

        }
        }).then((user)=>{
            res.status(202).json(user)
        }).catch(err=>{
            res.status(500).json({error:err})
        })
    
}
exports.getUserById= async (req,res,next)=>{
    try{
        const userid=req.params.id
        if(!userid){
           return res.status(400).json({err:"no user with this id"})
        }
        let user=await User.findByPk(userid)
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({error:err})
    }
   
}

exports.updateUser=(req,res,next)=>{
    const userId=req.params.id
    const{name,phoneno,email}=req.body
    if(!userId){
        console.log('id is missing')
       return  res.status(400).json({err:'id is miising'})
    }
    User.update({
        name:name,
        phoneno:phoneno,
        email:email

    },{
        where:{
            id:userId
        }
    }).then((updatedUser)=>{
        res.status(200).json(updatedUser)

    }).catch((err)=>{
        console.log("error while updating")
        res.status(500).json(err)
    })
}


