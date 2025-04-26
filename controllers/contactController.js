const Contact = require("../models/contactModel");

// GET all contacts from MongoDB
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET one contact by ID
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST create new contact
const createContact = async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ message: "Name, email, and phone are required" });
    }

    try {
        const contact = await Contact.create({ 
            name, 
            email, 
            phone });
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT update contact
const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        const { name, email, phone } = req.body;

        contact.name = name || contact.name;
        contact.email = email || contact.email;
        contact.phone = phone || contact.phone;

        const updatedContact = await contact.save();
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE contact
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
};
