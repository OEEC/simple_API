const express = require('express');
const app = express();

app.use(express.json());

const products = [
    { id: 1, name: 'paper roll package', quantity: 20, inInventary: true},
    { id: 2, name: 'Water bottle', quantity: 15, inInventary: true},
    { id: 3, name: 'tooth paste tube', quantity: 50, inInventary: true},
    { id: 4, name: 'Liquit soap bottle', quantity: 32, inInventary: true},
    { id: 5, name: 'corporal cream bottle', quantity: 5, inInventary: true},
];

app.get('/', (req, res) =>{
    res.send('NODJS API!');
});

app.get('/api/products', (req, res)=>{
    res.send(products);
});

app.get('/api/products/:id', (req,res) => {
    const product = products.find(p => p.id == req.params.id);
    if(!product) return res.status(404).send('Product not found');
    else return res.send(product);
});

app.post('/api/products', (req, res)=>{
    const product ={
        id: products.length + 1,
        name: req.body.name,
        quantity: parseInt(req.body.quantity),
        inInventary: true
    }

    products.push(product);
    res.send(product);
});

app.delete('/api/products/:id', (req,res) => {
    const product = products.find( p => p.id == parseInt(req.params.id));
    if(!product) return res.status(404).send('Product not found');

    const index = products.indexOf(product);
    products.splice(product, 1);
    res.send(products);
});

const port = process.env.port || 80;
app.listen(port, () => console.log(`Listening for port ${port}...`));