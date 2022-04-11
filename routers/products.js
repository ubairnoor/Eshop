const express = require('express');
const Category = require('../models/category');
const router = express.Router();
const Product = require('../models/products')
router.get(`/`, async (req, res) => {
    //to include what data you need add in select() and if we want to execulde use  -  sign to execlude.

    const productList = await Product.find().select('name image -_id');
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);

})
//get a product by id 
router.get(`/:id`,async(req , res)=>{
    const product = await Product.findById(req.params.id);
    console.log(product)
    if(!product)
    {
        res.status(500).json({success:false})
    }
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

module.exports = router;

