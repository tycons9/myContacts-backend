const express = require('express');
const router = express.Router();
const validateToken = require('./middleware/validateTokenHandler'); 
const {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contactController');

// Routes
router.use(validateToken); 
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContactById).put(updateContact).delete(deleteContact);

module.exports = router;
