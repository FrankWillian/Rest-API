const express = require('express')
const router = express.Router();

router.get('/posts', async function (req, res){

    res.json([{
        id: 1,
        title: 'Frank',
        date: new Date()
    }]);

});
router.get('posts/:id', async function (req, res) {

});
router.post('/posts', async function (req, res){

});
router.put('posts/:id', async function (res, req) {

});
router.delete('/post/:id', async function (res, req) {

});

module.exports = router;