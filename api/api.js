const express = require('express');
const app = express();
const PORT = 3000;

// use JSON for all requests
app.use(express.json());

// simple array of items
let items = [];

// CRUD operations:

// 1. Create (POST) - add new item
app.post('/items', (req, res) => {
    const newItem = { id: items.length + 1, name: req.body.name };
    items.push(newItem);
    res.status(201).json(newItem);
});

// 2. Read (GET) - get all items
app.get('/items', (req, res) => {
    res.json(items);
});

// 3. Read (GET) - get item by id
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
});

// 4. Update (PUT) - update item by id
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.name = req.body.name;
    res.json(item);
});

// 5. Delete (DELETE) - delete item by id
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });

    items.splice(itemIndex, 1);
    res.status(204).send();
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
