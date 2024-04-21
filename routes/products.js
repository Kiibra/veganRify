import { Router } from "express";
import * as productsCtrl from '../controllers/products.js'
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router()


// GET localhost:3000/products
router.get('/', isLoggedIn, productsCtrl.index)


// GET localhost:3000/products/new
router.get('/new', isLoggedIn, productsCtrl.new)


// POST localhost:3000/products
router.post('/', isLoggedIn, productsCtrl.create)


// DELETE localhost:3000/:productId
router.delete('/:productId', isLoggedIn, productsCtrl.delete)


//GET localhost:3000/:productId
router.get('/:productId', isLoggedIn, productsCtrl.show)


export{
  router
}