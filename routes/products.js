import { Router } from "express";
import * as productsCtrl from '../controllers/products.js'
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router()

// GET localhost:3000/products/new
router.get('/new', isLoggedIn, productsCtrl.new)

// GET localhost:3000/products
router.get('/', isLoggedIn, productsCtrl.index)

// POST localhost:3000/products
router.post('/', isLoggedIn, productsCtrl.create)


export{
  router
}