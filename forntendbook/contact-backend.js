const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const CONTACTS_FILE = path.join(__dirname, 'contacts.json');

// Initialize contacts file
async function initContactsFile() {
    try {
        await fs.access(CONTACTS_FILE);
    } catch {
        await fs.writeFile(CONTACTS_FILE, JSON.stringify([]));
    }
}

// Submit contact form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        const contact = {
            id: Date.now(),
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
            status: 'new'
        };

        const contacts = JSON.parse(await fs.readFile(CONTACTS_FILE, 'utf8'));
        contacts.push(contact);
        await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));

        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
});

// Get all contacts (for admin)
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = JSON.parse(await fs.readFile(CONTACTS_FILE, 'utf8'));
        res.json(contacts);
    } catch (error) {
        res.json([]);
    }
});

// Update contact status
app.put('/api/contact/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const contacts = JSON.parse(await fs.readFile(CONTACTS_FILE, 'utf8'));
        const contact = contacts.find(c => c.id == req.params.id);
        
        if (contact) {
            contact.status = status;
            await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update contact' });
    }
});

initContactsFile();
app.listen(9000, () => console.log('Contact backend running on port 9000'));
