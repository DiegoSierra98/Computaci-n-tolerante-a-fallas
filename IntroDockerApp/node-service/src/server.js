const express = require('express');
const app = express();

app.get('/', (_req, res) => {
  res.send('Welcome to my awesome app!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
