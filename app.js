const express= require('express');
const app=express();
const EjsMateEngine = require('ejs-mate');
const mongoose=require('mongoose');
const seed=require('./seed');
const ProductRoutes=require('./routes/productRoutes')
const ReviewRoutes=require('./routes/reviewRoutes')
const path=require('path')
const methodOverride = require('method-override')
const {productSchema}=require('./models/validation')

module.exports.validateProduct=(req,res,next)=>{
    const {error} =productSchema.validate(req.body);
    if(error){
        return res.send(error.details[0].message);
    }
    next()
}
mongoose.connect('mongodb://localhost/ShoppingCart')
.then(()=>{
    console.log('db connected');
})

// seed()
app.engine('ejs', EjsMateEngine);

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.use(ProductRoutes)
app.use(ReviewRoutes)



app.get('/',(req,res)=>{
    res.redirect('/products')
})






app.listen(3000,()=>{
    console.log('ho gaya connect')
})