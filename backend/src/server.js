import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { notesRoutes } from './routes/notesRoutes.js';
import { rateLimiter } from './middleware/rateLimiter.js';

const PORT = process.env.PORT || 5001;

const app = express();

// Middleware
// Initial middleware
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Log req.path and req.method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Mount routes
app.use('/api/notes', notesRoutes);

async function startServer() {
  try {
    //    Connect to DB
    await connectDB();
    //    Start listening to ports for requests
    app.listen(PORT, () => {
      console.log('Listening to port', PORT);
    });
  } catch (error) {
    console.log('Error starting server.', error);
    process.exit(1);
  }
}

startServer();
