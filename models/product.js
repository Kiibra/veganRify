import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  author: {type: Schema.Types.ObjectId, ref: "Profile"}
})

const productSchema = new Schema({
  mealName: { type: String, required: true },
  imageLink: String,
  description: String,
  author: {type: Schema.Types.ObjectId, ref: "Profile"},
  comments: [commentSchema],
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export {
  Product
}
