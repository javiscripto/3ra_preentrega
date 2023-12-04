import mongoose from "mongoose";


const ticketCollection= "tickets";

const ticketSchema= new mongoose.Schema({
    code:{type:String},
    purchaseDateTime:{},
    amount:{type:Number},
    purchaser:{type:String}
})

export const ticketModel= mongoose.model(ticketCollection,ticketSchema)