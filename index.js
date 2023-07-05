const express = require('express');
const path = require('path');
const fs = require('fs');
const router = require('./router')

let posts = require("./db/user.json")

const app = express();
const port = 3000;

// Middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/views'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(logger)

app.use( (req, res, next) => {
    res.locals.session = req.session
    next()
})

// End point
// Home Page
app.get("/", function(req, res){
    res.render('chapter3/index')
})

// Play Rock Paper Scissors Game
app.get("/play", (req, res) => {
    const username = req.query.username || 'Player 1'
    res.render('chapter4/index', {
        username
    })
})

app.get('/users', (req, res) => {
    res.end(JSON.stringify(posts))
})

// Signup user
app.post("/signup", (req, res) => {
    const { username, password } = req.body
    const id = posts[posts.length - 1].id + 1
    const post = {id, username, password}

    posts.push(post)
    fs.writeFileSync("./db/user.json", JSON.stringify(posts))
    res.redirect(`/play?username=${username}`)
})

// Login user
app.post("/login", (req, res) => {
    const { username, password } = req.body
    const user = posts.find(u => {
        return u.username === username && u.password === password
    })

    if (user) {
        res.redirect(`/play?username=${username}`)
    } else {
        res.json({
            status: 'Fail',
            errors: 'Invalid Username or Password!'
        })
    }
})

app.use(router)

// RESTful API
// User.json list
app.get('/api/v1/users', (req, res) => {
    res.status(200).json(posts)
})

// Show user with id
app.get('/api/v1/users/:id', (req, res) => {
    const post = posts.find(i => i.id == +req.params.id)
    res.status(200).json(post)
})

// Add new user
app.post('/api/v1/users', (req, res) => {
    const { username, password } = req.body
    const id = posts[posts.length - 1].id + 1
    const post = {id, username, password}

    posts.push(post)
    fs.writeFileSync("./db/user.json", JSON.stringify(posts))
    res.status(200).json(posts)
})

// edit username or password
app.put('/api/v1/users/:id', (req, res) => {
    let post = posts.find(i => i.id == +req.params.id)
    const params = { username: req.body.username, password: req.body.password}
    post = {...post, ...params}
    posts = posts.map(i => i.id == post.id ? post: i)
    fs.writeFileSync("./db/user.json", JSON.stringify(posts))
    res.status(200).json(post)
})

// delete users
app.delete('/api/v1/users/:id', (req, res) => {
    posts = posts.filter(i => i.id != +req.params.id)
    fs.writeFileSync("./db/user.json", JSON.stringify(posts))
    res.status(200).json({
        message: `User with id ${req.params.id} has been deleted!`
    })
})

//Error Handling Middleware
// 404 Handler
app.use(function(req, res, next) {
    res.status(404).json({
        status: 'Fail',
        errors: 'Page not found!'
    })
})

// Server Error Handler
app.use( (err, req, res, next) => {
    console.error(err)
    res.status(500).send('Sorry, something broke!')
})

app.listen(port, () => console.log(`Server berhasil dijalankan di http://localhost:${port}`));