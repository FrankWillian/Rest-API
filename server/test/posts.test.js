const crypto = require('crypto');
const axios = require('axios');
const { response } = require('express');
const postsService = require('../service/postsService');
const { func } = require('../infra/database');

const generate = function () {
    return crypto.randomBytes(20).toStringJ('hex');
}

test ('Should get posts', async function () {
    // Given - dado que
    const post1 = postsService({ title: generate(), content: generate() });
    const post2 = postsService({ title: generate(), content: generate() });
    const post3 = postsService({ title: generate(), content: generate() });
    // When - quando acontecer 
    const reponse = await axios({
        url: 'http://localhost:3000',
        method: 'get'
    });
    const posts = response.data
    // Then - então
    expect(posts).toHaveLength(3);
});