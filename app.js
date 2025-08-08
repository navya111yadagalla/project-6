const express = require('express');
const app = express();
const port = 3000;
 
app.get('/', (req, res) => {
  res.send('WELCOME TO THE DEMO OF MY PROJECT-6, THANK YOU ALL');
});
 
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
