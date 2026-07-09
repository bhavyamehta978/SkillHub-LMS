const express = require('express');
const { connectToMongo } = require('./db');
const Course = require('./models/Course');

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Database read failed' });
  }
});

app.post('/courses', async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).json({ message: 'Course added', course: savedCourse });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/courses/:id', async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated', course: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/courses/:id', async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', course: deleted });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

async function startServer() {
  await connectToMongo();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();