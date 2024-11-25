const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Express
const app = express();
app.use(express.json());

// Connect to Database
const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

// Define Model
const Photo = sequelize.define('Photo', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Sync Model with Database
sequelize.sync();

// REST Endpoints
app.get('/api/photos', async (req, res) => {
    const photos = await Photo.findAll();
    res.json({ data: photos });
});

app.post('/api/photos', async (req, res) => {
    const { title, url } = req.body;
    const newPhoto = await Photo.create({ title, url });
    res.status(201).json({ data: newPhoto });
});

// Start Server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
