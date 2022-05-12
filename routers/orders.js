const express =  require('express');
const {Order}= require('../models/orders');
const router =  express.Router();
const  {OrderItem}  = require('../models/order-item')
router.get(`/`,async(req,res)=>{
    console.log("Orders page")

    const orderList =  await Order.find().populate('user','name' ).sort({'dateOrdered':-1});// To get Order in Newest to oldest we have to add -1 
    // sORT fUNCTION SORT THE ORDERS IN OLDEST TO NEWEST DATE
    console.log("/////////>>>>",orderList)
    if(!orderList){
        res.status(500).json({
            success:false
        })
    }
    res.send(orderList);
})

router.get(`/:id`, async(req,res)=>{
    const order =  await Order.findById(req.params.id).populate('user','name').sort({'dateOrdered': -1});
    if(!order){
        res.status(500).json({
            success:false
        })
    }
    res.send(order);
})

router.post('/',async (req,res)=>{
const orderItemsIds = Promise.all (req.body.orderItems.map( async orderItem => {
    let newOrderItem =  new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product
    })
    newOrderItem =  await newOrderItem.save();
    console.log(newOrderItem)
    return newOrderItem._id
}))
const orderItemsIdsResolved = await orderItemsIds
console.log('>>>------------------------>>>>>>>>',orderItemsIdsResolved);

    let order =  new Order({
        orderItems:orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2:req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.country,
        status:req.body.status,
        totalPrice:req.body.totalPrice,
        user:req.body.user,
    })
    console.log(">>",order)
    order = await order.save();
    if(!order)
    return res.status(400).send('the order cannot be created');
    res.send(order)
})

// Update the 
 //the admin want to update the status of the order
 //the order is tranfered from pending to ship to deliver state
 //we need to just to update the status

router.put('/:id',async (req,res)=>{
    const order = await Order.findByIdAndUpdate(
        req.params.id,{
            status: req.body.status
        },
        {new: true}
    )
    if(!order)
    return res.status(400).send('The Order is not Found');
    res.send(order)
})
module.exports = router;

