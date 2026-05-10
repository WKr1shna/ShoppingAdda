const express=require('express')
const router=express.Router();
const Product=require('../models/product')
const Review=require('../models/reviews')
const { reviewSchema } = require('../models/validation');


router.post('/products/:id/reviews',async (req,res)=>{
    const {error}=reviewSchema.validate(req.body)
    if(error){

    const {id}= req.params;

    const product = await Product
        .findById(id)
        .populate('reviews');

    return res.render('products/show.ejs',{
        product,
        error:null
    })
}
    const {id}= req.params;
    const {rating,comment}=req.body;
    const product=await Product.findById(id);
    const review= await Review.create({rating,comment})
    
    product.reviews.push(review);

    await product.save();

    res.redirect(`/products/show/${id}`);

})

router.delete('/products/:pid/reviews/delete/:rid', async(req,res)=>{
    const {pid,rid} =  req.params;
    console.log(pid,rid);
    // console.log(req.get('Referer'))
    // console.log(req.originalUrl)
    await Review.findByIdAndDelete(rid)
    // console.log(pid,rid);
    res.redirect(`/products/show/${pid}`)
})



module.exports=router;









