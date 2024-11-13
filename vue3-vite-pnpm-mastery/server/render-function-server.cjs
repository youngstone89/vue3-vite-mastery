// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/render-function', (req, res) => {
  const renderFunction = `
    function(h) {
      return function() {
        return h('div', [
          h('h1', 'Dynamic Component'),
          h('p', 'This component was loaded from a remote server!')
        ]);
      }
    }
  `;
  res.type('application/javascript');
  res.send(renderFunction);
});

app.listen(3000, () => console.log('Server running on port 3000'));