const express = require('express');
const Category = require('../models/category');
const router = express.Router();
const Product = require('../models/products')
const mongoose = require('mongoose')
router.get(`/`, async (req, res) => {
    //to include what data you need add in select() and if we want to execulde use  -  sign to execlude.
    //localhost:3000/api/v1/products?categories = 2342342
    let filterArray  = []
    if(req.query.categories){
         filterArray = req.query.categories.split(',')
    }
    const productList = await Product.find({category:filterArray}).populate('category');
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);

})
//get a product by id 
router.get(`/:id`,async(req , res)=>{
    const product = await Product.findById(req.params.id).populate('category');
    console.log(product)
    if(!product)
    { 
        res.status(500).json({success:false})
    }
    res.status(200).send(product)
})

// update a  product
router.put('/:id',async (req,res)=>{
    //when we give wrong id to update we didnt get nothing so what we do we will check id in mongodb is tit valid or not
    if(!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Object Id')
    } 
    const category = await Category.findById(req.body.category);
    console.log(category)
    if(!category) return res.status(400).send('Invalid Category')
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            image: req.body.image,
            countInStock: req.body.countInStock,
            description: req.body.description,
            richDescription: req.body.richDescription,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,

        },
        { new: true}
    )
    if(!product)
    return res.status(500).send("The Product cannot be Updated");
    res.status(200).send(product)
})
router.post(`/`, async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid Category")
    let product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
        description: req.body.description,
        richDescription: req.body.richDescription,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated,

    });
    product = await product.save();

    if (!product)
        return res.status(500).send('The Product cannot be Created')

    res.send(product)

})
//Deleting a product

router.delete(`/:id`,(req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product => {
        if(product){
            return res.status(200).json({success:true, message:'Product is deleted'})
        } else {
            return res.status(404).json({success:false, message:'Product is not Deleted'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, error:err})
    })

})
//Show how many Product in Database to admin Panel.
router.get('/get/count', async (req,res) =>{
    console.log("Inside the Route")
   const productCount = await Product.countDocuments();
    console.log(">>>>>>>>>>>>>>>",productCount)
    if(!productCount){
        res.status(500).json({success:false})
    }
    res.send({
        count:productCount
    })
    
})
// Get Featured Product Api statistics Request

router.get('/get/feature/:count', async (req,res)=>{
//now if the user send count of feature product
const count = req.params.count ? req.params.count:0
//if there is count passed it with Api or then get it 
//after we get Feature Product we say Limit(count)
    const featureProduct = await Product.find({isFeatured:true}).limit(count)
    if(!featureProduct){
        res.status(500).json({success:false})

    }
    res.send({
        featureProduct:featureProduct
    })


})
//Filter By Categories

module.exports = router;

