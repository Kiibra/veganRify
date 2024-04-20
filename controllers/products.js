import { Product } from "../models/product.js"

function newProduct(req, res){
  res.render('products/new', {
    title: 'Add Product',
  })
}
function index(req, res){
  Product.find({})
  .then(product =>{
    res.render('products/index', {
      title: 'All Products'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}
function create(req, res){
  // get the author who is posting this product from their google profile 
  req.body.author = req.user.profile._id
  // then create a post with the data in the form(red.body)
  Product.create(req.body)
  .then(product => {
  // then redirect to the post index view/page
    res.redirect('/products')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}
export {
  newProduct as new,
  index,
  create,
}