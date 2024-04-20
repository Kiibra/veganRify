import { Product } from "../models/product.js"

function newProduct(req, res){
  res.render('products/new', {
    title: 'Add Product',
  })
}

export{
  newProduct as new,
}