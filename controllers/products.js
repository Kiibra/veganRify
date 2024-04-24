import { Product } from "../models/product.js"
import { Profile } from "../models/profile.js"

function newProduct(req, res){
  res.render('products/new', {
    title: 'Add Product',
  })
}
function index(req, res){
  Product.find({})
  // populate the author of each product post
  .populate('author')
  .then(products => {
    res.render('products/index', {
      title: 'All Products',
      products: products
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res){
  Product.findById(req.params.productId)
  .then(product => {
    if(product.author.equals(req.user.profile._id)) {
      res.render('products/edit', {
        product,
        title: 'Edit Product',
      })
    } else {
      throw new Error('Action Not Authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/products')
  })
}

function create(req, res){
  // get the author who is posting this product from their google profile 
  req.body.author = req.user.profile._id
  // then create a post with the data in the form(red.body)
  Product.create(req.body)
  .then(products => {
  // then redirect to the post index view/page
    res.redirect('/products')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res){
  // find the product by it's _id
  Product.findById(req.params.productId)
  // populate the author to get info about the person who made the post
  .populate('author')
  //display the author by populating it to comments('comments.author')
  .populate('comments.author')
  .then(product => {
    res.render('products/show', {
      title: "Product Detail",
      product
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteProduct(req, res){
  // req.body.author = req.user.profile._id
  Product.findByIdAndDelete(req.params.productId)
  .then(product => {
    if (product.author._id.equals(req.user.profile._id)){
    res.redirect('/products')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}
function update (req, res){
  Product.findByIdAndUpdate(req.params.productId, req.body, {new: true})
  .then(product => {
    // redirect to show view
    res.redirect(`/products/${product._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/products')
  })
}

function createComment(req, res){
  Product.findById(req.params.productId)
  .then(product => {
    req.body.author = req.user.profile._id
    product.comments.push(req.body)
    product.save()
    .then(()=> {
      res.redirect(`/products/${product._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteComment(req, res) {
  Product.findById(req.params.productId)
  .then(product => {
    product.comments.remove({_id: req.params.commentId})
    product.save()
    .then(() => {
      res.redirect(`/products/${product._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function editComment (req, res){
  Product.findById(req.params.productId)
  .then(product => {
    const comment = product.comments.id(req.params.commentId)
    if(comment.author.equals(req.user.profile._id)) {
      res.render('products/editComment', {
        product,
        comment,
        title: 'Update Comment'
      })
    }else{
      throw new Error('Action Not Authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/products')
  })
}


function updateComment(req, res){
  Product.findById(req.params.productId)
  .then(product => {
    const comment = product.comments.id(req.params.commentId)
    if (comment.author.equals(req.user.profile._id)) {
      comment.set(req.body)
      product.save()
      .then(() => {
        res.redirect(`/products/${product._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/products')
      })
    }else{
      throw new Error('Not Authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/products')
  })
}


export {
  newProduct as new,
  index,
  create,
  deleteProduct as delete,
  show,
  createComment,
  deleteComment,
  edit,
  update,
  editComment,
  updateComment,
}