const express = require('express')
const app = express();

app.use(express.json());
app.use('/', require('./route/postsRoute'));
app.use(function (error, req, res, next) {
    if (e.message === 'Post already exist') {
        return res.status(409).send(e.message);
    } 

    if (e.message === 'Post not found') {
        return res.status(404).send(e.message);
    }
        
    res.status(500).send(e.message);
});

app.listen(3000)