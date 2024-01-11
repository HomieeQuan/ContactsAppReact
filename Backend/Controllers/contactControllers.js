const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({user_id: req.user._id})
    res.status(200).json(contacts)
})


const createContact = async (req,res) => {
    console.log('createcontact',req.body)
    const { name, email, phone} = req.body
    if(!name || !email || !phone) {
        res.status(400)
        throw new Error('All fields are required')
    }
    console.log('before')
    const contact = await Contact.create({
        name, 
        email, 
        phone,
        user_id: req.user._id
    })
    console.log('after',contact)
    res.status(201).json(contact)
}

const getContact =asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    res.status(200).json(contact)
})


const updateContact = asyncHandler(async (req,res) => {
    console.log('starting update contact')
    const contact = await Contact.findById(req.params.id)
    console.log(req.params.id, req.body,contact)
    if(!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    // if(contact, user_id.toString() !== req.user_id) {
    //     res.status(404)
    //     throw new Error('User is forbidden')
    // }
    // const updatedContact = await Contact.findByIdAndUpdate(
    //     req.params.id,
    //     req.body,
    //     { new: true}
    // )
    contact.name = req.body.name
    contact.email = req.body.email
    contact.phone = req.body.phone
    console.log('contact before save', contact)
    const ret = await contact.save()
    console.log('ret from save', ret)
    
    res.status(200).json(contact)
})

const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    // if(contact, user_id.toString() !== req.user_id) {
    //     res.status(404)
    //     throw new Error('User is forbidden')
    // }
    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json(contact)
})

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}