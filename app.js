/**
 * Alex Peterson    Alex Joseph.Peterson@CalBaptist.edu
 * Last Edited: 03/09/2021
 *
 * App.js
 *
 *Note: I did discuss this assignment with fellow students.
 * Discussed with: Miach and Chase.
 **/

const express = require('express');
const fetch = require ('node-fetch');

// express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// listen for requests
app.listen(5000, () => {
  console.log("listening on port 5000");
  getBlogs();
});

// register view engine
//we need to define a view engine,  we will use EJS
//using app.set()
app.set('view engine', 'ejs');
// app.set('views', 'myviews');
let blogs = [];

//asynchronously retrieve the blog data from the API
//Discussed using node-fetch and got it working with Chase.
async function getBlogs(){
  await fetch('https://jsonplaceholder.typicode.com/posts/')
      .then(res => res.json())
      .then(blog => blogs = blog)

}


//creates the viewable blog page. Passes the blogs to the ejs template for data handling
app.get('/', (req, res) => {
  // getBlogs();

  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
