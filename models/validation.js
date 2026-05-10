const joi=require('joi')

module.exports.productSchema=joi.object({
    name:joi.string().min(2).max(30).required(),
    price:joi.number().min(0).required(),
    img:joi.string().uri().required(),
    desc:joi.string().min(10).required()
})

module.exports.reviewSchema=joi.object({
    rating:joi.number().min(1).max(5).required(),
    comment:joi.string().min(5).max(300).required()
})