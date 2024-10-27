const books = require('./data/books.json');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());


// GET http://localhost:3000/all
app.get('/all', (req, res) => {
    res.send(books);
});

// GET http://localhost:3000/first
app.get("/first", (req, res) => {
    res.send(
        books[0]
    );
});

// GET http://localhost:3000/last
app.get('/last', (req, res) => {
    const lastBook = books[books.length - 1]; // Obtiene el último libro del arreglo
    res.send(lastBook);
});

// GET http://localhost:3000/middle
app.get("/middle", (req, res) => {
    res.send(books[Math.round((books.length - 1)/2)]);
});

// GET http://localhost:3000/author/dante-alighieri
app.get('/author/:authorName', (req, res) => {
        books.forEach(book => {
            book.author == 'Dante Alighieri' ? res.json(book.title) : ""
        })
    });

// GET http://localhost:3000/country/charles-dickens
app.get('/country/:authorName', (req, res) => {
    books.forEach(book => {
        book.author == 'Charles Dickens' ? res.json(book.country) : ""
    })
});

// GET http://localhost:3000/year&pages/miguel-de-cervantes
app.get('/year&pages/:authorName', (req, res) => {
    books.forEach(book => {
        if (book.author == 'Miguel de Cervantes'){
            let pageAndYear = {pages: book.pages,year: book.year}
            res.send(pageAndYear)
        }
    })
});


// GET http://localhost:3000/country/count/spain
app.get('/country/count/:countryName', (req, res) => {
    let counter = 0;
    books.forEach(book => {book.country ==='Spain' ? counter++ : ""})
    res.json(counter);
});

// GET http://localhost:3000/country/at-least/germany
app.get("/country/at-least/germany", (req, res) => {
    let oneGerman = false;
    books.forEach(book => {book.country === 'Germany' ? oneGerman = true : "";})
    res.json(oneGerman);
});

// GET http://localhost:3000/pages/all-greater/200
app.get("/pages/all-greater/200", (req, res) => {
    let allMoreThan100 = true;
    books.forEach(book => {book.pages < 200 ?  allMoreThan100 = false : "";})
    res.json(allMoreThan100);
});

// Para ruta no existente
app.use("*",(req, res) => {
  res.send("Ruta no encontrada");
});



// Inicia el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});