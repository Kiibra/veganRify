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

// GET localhost:3000/:productId/edit
router.get('/:productId/edit', isLoggedIn, productsCtrl.edit)

// DELETE localhost:3000/:productId
router.delete('/:productId', isLoggedIn, productsCtrl.delete)

//GET localhost:3000/:productId
router.get('/:productId', isLoggedIn, productsCtrl.show)

// POST localhost:3000/products <- to create a comment under a picture 
router.post('/:productId/comments', isLoggedIn, productsCtrl.createComment)

// DELETE localhost:3000/:productsId/comments/:commentId
router.delete('/:productId/comments/:commentId', isLoggedIn, productsCtrl.deleteComment)

// PUT localhost:3000/product/:productId
router.put('/:productId', isLoggedIn, productsCtrl.update)

// PUT localhost:3000/:productId/comments/:commnetId
router.put('/:productId/comments/:commentId', isLoggedIn, productsCtrl.updateComment)

router.get('/:productId/comments/:commentId/edit', isLoggedIn, productsCtrl.editComment)


export{
  router
}