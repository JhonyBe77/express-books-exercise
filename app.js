const books = require('./data/books.json');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());


// GET http://localhost:3000
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// GET http://localhost:3000/all
app.get('/all', (req, res) => {
    res.json(books);
});

// GET http://localhost:3000/last
app.get('/last', (req, res) => {
    const lastBook = books[books.length - 1]; // Obtiene el último libro del arreglo
    res.json(lastBook);
});

// GET http://localhost:3000/middle
app.get('/middle', (req, res) => {
    const middleBook = books[49]; // Obtiene el libro en la posición 50 (índice 49)
    res.json(middleBook);
});

// GET http://localhost:3000/author/dante-alighieri
app.get('/author/:authorName', (req, res) => {
    const authorName = req.params.authorName.toLowerCase().replace(/-/g, ' ');  // Poner en minisculas y convertir guiones a espacios
    /* // Mostrar todos los autores para verificar el formato
    console.log("Autores disponibles:", books.map(b => b.author));
 */
    // Buscar libro por autor ignorando mayúsculas/minúsculas
    const book = books.find(b => b.author.toLowerCase() === authorName);

    if (book) {
        res.json({ title: book.title });
    } else {
        res.status(404).send('Autor no encontrado');
    }
});

// GET http://localhost:3000/country/charles-dickens
app.get('/country/:authorName', (req, res) => {
    const authorName = req.params.authorName.toLowerCase().replace(/-/g, ' ');
    const book = books.find(b => b.author.toLowerCase() === authorName);

    if (book) {
        res.json({ country: book.country });
    } else {
        res.status(404).send('Autor no encontrado');
    }
});

// GET http://localhost:3000/year&pages/miguel-de-cervantes
app.get('/year&pages/:authorName', (req, res) => {
    const authorName = req.params.authorName.toLowerCase().replace(/-/g, ' ').normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Elimina los acentos

    // Mostrar el autor procesado y los autores disponibles
    console.log("Autor buscado:", authorName);
    console.log("Autores en el archivo:", books.map(b => b.author.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));

    const book = books.find(b => b.author.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === authorName);

    if (book) {
        res.json({ pages: book.pages, year: book.year });
    } else {
        res.status(404).send('Autor no encontrado');
    }
});


// GET http://localhost:3000/country/count/spain
app.get('/country/count/:countryName', (req, res) => {
    const countryName = req.params.countryName.toLowerCase();

    const bookCount = books.filter(b => 
        b.country.toLowerCase() === countryName
    ).length;

    res.json({ count: bookCount });
});

// GET http://localhost:3000/country/at-least/germany
app.get('/country/at-least/:countryName', (req, res) => {
    const countryName = req.params.countryName.toLowerCase();

    const hasBook = books.some(b => 
        b.country.toLowerCase() === countryName
    );

    res.json({ hasBook });
});

// GET http://localhost:3000/pages/all-greater/200
app.get('/pages/all-greater/:pageCount', (req, res) => {
    const pageCount = parseInt(req.params.pageCount, 10);

    const allGreater = books.every(b => 
        b.pages > pageCount
    );

    res.json({ allGreater });
});



// Inicia el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});