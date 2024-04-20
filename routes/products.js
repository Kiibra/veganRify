import { Router } from "express";
import * as productsCtrl from '../controllers/products.js'
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router()

router.get('/new', productsCtrl.new)


export{
  router
}