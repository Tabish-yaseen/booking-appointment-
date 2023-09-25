const express=require('express')
const router=express.Router()
const userController=require('../controllers/user')


router.post('/add-user',userController.postAddUser)
router.get('/get-users',userController.getUsers)
router.delete('/delete-user/:id',userController.deleteUser)
router.put('/update-user/:id',userController.updateUser)
router.get('/get-userbyId/:id',userController.getUserById)



module.exports=router