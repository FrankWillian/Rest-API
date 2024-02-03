const crypto = require('crypto');
const axios = require('axios');
const { response } = require('express');
const postsService = require('../service/postsService');
const { func } = require('../infra/database');

const generate = function () {
    return crypto.randomBytes(20).toStringJ('hex');
}

const request = function (url, method, data) {
    return axios({ url, method, data})
}

test('Should get posts', async function () {
    const post1 = await postsService({ title: generate(), content: generate() });
    const post2 = await postsService({ title: generate(), content: generate() });
    const post3 = await postsService({ title: generate(), content: generate() });
    const reponse = await request ('http://localhost:3000', 'get' );
    const posts = response.data
    expect(posts).toHaveLength(3);
    await postsService.deletePost(post1.id);
    await postsService.deletePost(post2.id);
    await postsService.deletePost(post3.id);
});

test ('Should save posts', async function () {
    const data = { title: generate(), content: generate() };
    const reponse = await request ('http://localhost:3000', 'post', data );
    const post = response.data
    expect(post.title).toBe(data.title);
    expect(post.content).toBe(data.content);
    await postsService.deletePost(post.id);

});

test ('Should update posts', async function () {
    const post = await postsService.savePost({title: generate(), content: generate() });
    post.title = generate();
    post.contente = generate();
    await request(`http:localhost:3000/post/${post.id}`, 'put', post);
    const updatePost = await postsService.getPosts(post.id);
    expect(updatePost.title).toBe(post.title);
    expect(updatePost.content).toBe(post.content);
    await postsService.deletePost(post.id);
});

test ('Should delete posts', async function () {
    const post = await postsService.savePost({title: generate(), content: generate() });
    await request(`http:localhost:3000/post/${post.id}`, 'delete');
    const posts = await postsService.getPosts();
    expect(posts).toHaveLength(0);
});