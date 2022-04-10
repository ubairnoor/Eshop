

const express = require('express');
const Category = require('../models/category');
const router = express.Router();

router.get('/', async(req,res)=>{
    const categoryList =  await Category.find();
    console.log(categoryList)

    if(!categoryList){
        res.status(500).json({message:"The Category with the given Id was not Found" })
    }
    res.status(200).send(categoryList);
})
//Adding Catogory
router.post('/', async (req,res)=>{
    let category = new Category({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color
    })
    category =  await category.save();
    if(!category)
    return res.status(404).send('the category cannot be created');

    res.send(category)
})

//Delete Catogory
router.delete('/:id',(req,res)=>{
    // let do it in Promise way we did it before in post in async way.
    //now we will do it in Promise way
    //Steps>> Find the Module now here where we find the ID we find id from client.
    Category.findByIdAndRemove(req.params.id).then(category=>{
        if(category){
            return res.status(200).json({success:true,message:'The Category is Deleted'})
        }else{
            return res.status(404).json({success:false, message:'Category is not Found'})
        }
    }).catch(err=>{
        return res.status(400).json({ success:false,error:err })
   })
})

module.exports = router;