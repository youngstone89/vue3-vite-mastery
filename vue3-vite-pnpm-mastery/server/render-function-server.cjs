// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/render-function', (req, res) => {
  const renderFunction = `
    function(h, { ref, onMounted }) {
      const count = ref(0);

      function increment() {
        count.value++;
      }

      return function() {
        return h('div', [
          h('h1', 'Dynamic Interactive Component'),
          h('p', \`Count: \${count.value}\`),
          h('button', {
            onClick: increment
          }, 'Increment')
        ]);
      }
    }
  `;
  res.type('application/javascript');
  res.send(renderFunction);
});

app.listen(3000, () => console.log('Server running on port 3000'));