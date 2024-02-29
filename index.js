// Import necessary modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const cardRoutes = require('./routes/routes'); 

const allowedOrigins = ['http://localhost:3000', 'https://card-giving.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) > -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

const app = express();

app.use(cors({ origin: corsOptions }));

app.use(express.json()); 

app.use('/api', cardRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
