const express = require('express');
const Customer = require('../models/Customer')
const Payment = require('../models/Customer')
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler')

const router = express.Router();

// Middleware for validation and error handling
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


// Create a new customer (POST)
const createPayment = asyncHandler(async (req, res)=>{const {name,amountPaid,change,otherMethods} = req.body

//confirm data
if(!name || !amountPaid ||!change ||!otherMethods ){
  return res.status(400).json({message:'All fields are required'})
}
//check for Duplicate
const duplicate = await  Payment.findOne({name}).lean().exec()

if (duplicate ){
  return res.status(409).json({message: 'Duplicate name'})
}
 
const paymentObject = {name,amountPaid,change,otherMethods}

//create and store a new payment

const payment = await Payment.create(paymentObject)

if (payment){//created
  res.status(201).json({message: 'New Payment created'})
}else{
  res.status(400).json
({message:'invalid payment data recieved'})
}
})

// Get all payments (GET)
const getAllPayments = asyncHandler(async(req,res) => {
 
    const payments = await Payment.find().lean();
    if (!payments){
      return res.status(400).json({message:'No Payments found'})
    }
    res.json(payments)
});

// Update a customer's details (PUT)
const updatePayments = asyncHandler(async (req,res)=>{
 const { id,name,amountPaid,change,otherMethods} = req.body

 //confirm data 
 if (!id ||!name || !amountPaid ||!change ||!otherMethods ){
  return res.status(400).json({message:'All fields are required'})
 }
 const payment = await Payment.findById(id).exec()

 if (!payment){
  return res.status(400).json
  ({message:'Payment not found'})
 }
 const duplicate = await Payment.findOne({name}).lean().exec
()
// allow updates to the original customer
if (duplicate && duplicate?._id.toString() !==id){
  return res.status(409).json
  ({message:'Duplicate Name'})
}
!name || !amountPaid ||!change ||!otherMethods 
payment.name = name
payment.amountPaid= amountPaid
payment.change = change
payment.otherMethods = otherMethods


const updatedPayment = await payment.save()

res.json({message: `${updatedPayment.name} updated`})
})

// Delete a Payments (DELETE)
const deletePayments = asyncHandler(async (req,res)=>{
  const {id} = req.body
  if(!id){
    return res.status(400).json
    ({message:'Payment Id required'})
  }

  const payment = await Payment.findById(id).exec()

  if (!payment) {
           return res.status(404).json({ message: 'payment not found' });
  }
  const result = await payment.deleteOne()

  const reply = `name ${result.name} with Id ${result._id} deleted`

  res.json(reply)
})



module.exports = {
  getAllPayments,
  createPayments,
  updatePayments,
  deletePayments,
}
