const asyncHandler = require("express-async-handler"); 
const Contact=require("../models/contactModel");
const mongoose = require('mongoose');

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts =asyncHandler( async (req,res)=>{
    const contacts= await Contact.find({user_id : req.user.id});
    // res.status(200).json({message:"Get all contacts"});
    res.status(200).json(contacts);
});

//@desc Create new contacts
//@route POST /api/contacts
//@access private
const createContacts = asyncHandler(async (req,res)=>{
    console.log('The request body is : ', req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    
    const contact = await Contact.create({
        // name:req.body.name,
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    // res.status(201).json({message:"Create contacts"});
    res.status(201).json(contact);
});

//@desc Get contacts
//@route GET /api/contacts/:id
//@access private
const getContact =asyncHandler( async (req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404);
    throw new Error("Invalid contact ID");
  }
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    // res.status(200).json({message:`Get contact for ${req.params.id}`});
    res.status(200).json(contact);
});
 
//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404);
    throw new Error("Invalid contact ID");
  }
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other users contact");
        
    }

    const updateContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    // res.status(200).json({message:`Update contacts for ${req.params.id}`});
    res.status(200).json(updateContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private  
const deleteContact = asyncHandler(async (req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404);
    throw new Error("Invalid contact ID");
  }
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete other users contact");
        
    }
    // await contact.remove();
    await contact.deleteOne({_id: req.params.id}); // on the document itself

    // res.status(200).json({message:`Delete contacts for ${req.params.id}`});
    res.status(200).json({contact});
});

module.exports={
    getContacts,
    createContacts,
    getContact,
    updateContact,
    deleteContact,
}
