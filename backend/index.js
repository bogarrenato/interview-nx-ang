const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const items = [
    { id: 1, name: 'Laptop', price: 299999, description: 'MacBook Pro M2' },
    { id: 2, name: 'Phone', price: 199999, description: 'iPhone 15 Pro' },
    { id: 3, name: 'Tablet', price: 159999, description: 'iPad Air' }
];

app.get('/api/items', (req, res) => {
    res.json(items);
});

app.get('/api/items/:id', (req, res) => {
    const item = items.find(item => item.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});