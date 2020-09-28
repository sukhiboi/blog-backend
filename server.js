const app = require('./app');

const PORT = process.env.PORT || process.argv[2] || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));