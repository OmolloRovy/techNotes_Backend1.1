const express = require('express');
const Customer = require('../models/Customer')
const Note = require('../models/Note')
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
const createCustomer = asyncHandler(async (req, res)=>{const {name, email, address, phone_number, device_details} = req.body

//confirm data
if(!name || !email ||!address ||!phone_number || !device_details){
  return res.status(400).json({message:'All fields are required'})
}
//check for Duplicate
const duplicate = await  Customer.findOne({email}).lean().exec()

if (duplicate ){
  return res.status(409).json({message: 'Duplicate email'})
}
 
const customerObject = {name, email, address, phone_number, device_details}

//create and store a new customer

const customer = await Customer.create(customerObject)

if (customer){//created
  res.status(201).json({message: 'New customer created'})
}else{
  res.status(400).json
({message:'invalid customer data recieved'})
}
})

// Get all customers (GET)
const getAllCustomers = asyncHandler(async(req,res) => {
 
    const customers = await Customer.find().lean();
    if (!customers){
      return res.status(400).json({message:'No customers found'})
    }
    res.json(customers)
});

// Update a customer's details (PUT)
const updateCustomer = asyncHandler(async (req,res)=>{
 const {id,name,email,address,phone_number,device_details} = req.body

 //confirm data 
 if (!id || !name ||!email ||!address ||!phone_number ||!device_details){
  return res.status(400).json({message:'All fields are required'})
 }
 const customer = await Customer.findById(id).exec()

 if (!customer){
  return res.status(400).json
  ({message:'Customers not found'})
 }
 const duplicate = await Customer.findOne({email}).lean().exec
()
// allow updates to the original customer
if (duplicate && duplicate?._id.toString() !==id){
  return res.status(409).json
  ({message:'Duplicate Email'})
}
customer.name = name
customer.email= email
customer.address= address
customer.phone_number= phone_number
customer.device_details= device_details

const updatedCustomer = await customer.save()

res.json({message: `${updatedCustomer.email} updated`})
})

// Delete a customer (DELETE)
const deleteCustomer = asyncHandler(async (req,res)=>{
  const {id} = req.body
  if(!id){
    return res.status(400).json
    ({message:'Customer Id required'})
  }

  const payments = await Payment.findOne({customer: id}).lean().exec()
  if(customers?.length){
    return res.status(400).json({message:'Customer machine is in repair'})
  }
  const customer = await Customer.findById(id).exec()

  if (!customer) {
           return res.status(404).json({ message: 'Customer not found' });
  }
  const result = await customer.deleteOne()

  const reply = `email ${result.email} with Id ${result._id} deleted`

  res.json(reply)
})



module.exports = {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
}
