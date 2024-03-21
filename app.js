const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const currentTime = new Date().toLocaleTimeString(); // 예: "11:14:48 AM"
    res.render('index', { currentTime });
});

app.get('/origin', (req, res) => {
    const currentTime = new Date().toLocaleTimeString();
    res.render('origin', { currentTime });
});

app.get('/recipe', (req, res) => {
    const currentTime = new Date().toLocaleTimeString();
    res.render('recipe', { currentTime });
});

app.get('/nickname', (req, res) => {
    const currentTime = new Date().toLocaleTimeString();
    res.render('nickname', { currentTime });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});