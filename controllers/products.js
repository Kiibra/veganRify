import { Product } from "../models/product.js"

function newProduct(req, res){
  res.render('products/new', {
    mealName: 'Add Meal',
  })
}

export{
  newProduct as new
}