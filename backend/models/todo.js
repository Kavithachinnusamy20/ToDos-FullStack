import mongoose from "mongoose";

const todoSchema =mongoose.Schema({
    text: {type:String},
    completed :{ type :Boolean, default: false }
})

const todo =mongoose.model('todo',todoSchema)
export default todo