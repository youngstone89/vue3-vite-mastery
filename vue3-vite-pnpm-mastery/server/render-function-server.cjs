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

      // Define styles
      const styles = {
        container: {
          fontFamily: 'Arial, sans-serif',
          padding: '20px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px'
        },
        title: {
          color: '#333',
          fontSize: '24px'
        },
        counter: {
          fontSize: '18px',
          margin: '10px 0',
          color: 'black'
        },
        button: {
          backgroundColor: '#4CAF50',
          border: 'none',
          color: 'white',
          padding: '10px 20px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          margin: '4px 2px',
          cursor: 'pointer',
          borderRadius: '4px'
        }
      };

      return function() {
        return h('div', { style: styles.container }, [
          h('h1', { style: styles.title }, 'Dynamic Interactive Component'),
          h('p', { style: styles.counter }, \`Count: \${count.value}\`),
          h('button', {
            onClick: increment,
            style: styles.button
          }, 'Increment')
        ]);
      }
    }
  `;
  res.type('application/javascript');
  res.send(renderFunction);
});

app.listen(3000, () => console.log('Server running on port 3000'));