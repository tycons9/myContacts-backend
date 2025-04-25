// Dummy contact list (in-memory)
let contacts = [
    { id: 1, name: "Eyob", email: "eyob@gmail.com", phone: "1234567890" }
];

// GET all contacts
const getContacts = (req, res) => {
    res.status(200).json(contacts);
};

// GET one contact by ID
const getContactById = (req, res) => {
    const contact = contacts.find(c => c.id == req.params.id);
    if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
};

// POST create new contact
const createContact = (req, res) => {
    console.log(req.body); // Debug log to check the body
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ message: "Name, email, and phone are required" });
    }

    const newContact = {
        id: contacts.length + 1,
        name,
        email,
        phone
    };
    contacts.push(newContact);
    res.status(201).json(newContact);
};

// PUT update contact
const updateContact = (req, res) => {
    const contact = contacts.find(c => c.id == req.params.id);
    if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
    }
    const { name, email, phone } = req.body;
    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;
    res.status(200).json(contact);
};

// DELETE contact
const deleteContact = (req, res) => {
    contacts = contacts.filter(c => c.id != req.params.id);
    res.status(200).json({ message: "Contact deleted" });
};

module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};
