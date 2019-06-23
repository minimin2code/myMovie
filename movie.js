//Load libs
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

//tunables
const PORT = parseInt(process.argv[2] || process.env.APP_PORT || 3000);

//Create an instance of the applicaiton
const app = express();

const db = [""];
let index = 1;

//Configure handle bars
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));

//Add request handlers
app.post('/movie', (req, resp) => {
    const movieList = Object.values(req.body);
    db.push(movieList);
    resp.status(201);
    resp.type('text/html')
    resp.render('movie', { //render to movie.hbs
      name:movieList[0],
      type: movieList[1],
      picName: movieList[2],
      director: movieList[3],
      boxOff: movieList[4],
      description: movieList[5]

    }); 
    index++;
    console.log(movieList)
})


app.get(/.*/, express.static(__dirname + '/movie'));

// Start the server
app.listen(PORT, () => {
    console.info('Todo application started on %s at port %d', new Date(), PORT);
});