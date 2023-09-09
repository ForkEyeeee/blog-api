#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("This script populates some test posts and comments to your database.");
// Get arguments passed on command line
const userArgs = process.argv.slice(2);
const mongoose = require("mongoose");
const Post = require("./dist/models/post"); // Import the Post model
const Comment = require("./dist/models/comment"); // Import the Comment model
const posts = [];
const comments = [];
const mongoDB = userArgs[0];
mongoose.set("strictQuery", false); // Prepare for Mongoose 7
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
    await createPosts();
    await createCommentsForAllPosts();
    mongoose.connection.close();
}
async function createPosts() {
    console.log("Adding posts");
    const postData = [
        "The beauty of Nature",
        "Exploring the World of AI",
        "Adventures in the Himalayas",
        "The Mysterious Oceans",
        "Journey through Middle Earth",
    ];
    for (let title of postData) {
        const post = new Post({
            title: title,
            time: new Date().toISOString(),
            published: true,
        });
        await post.save();
        posts.push(post);
    }
    console.log("Added 5 posts");
}
async function createCommentsForAllPosts() {
    console.log("Adding comments");
    const commentData = [
        "Great post! Loved it.",
        "Very insightful, thanks for sharing.",
        "I didn't know that, interesting.",
        "Amazing! Please write more on this topic.",
        "This was a helpful read, looking forward for more!",
    ];
    for (let post of posts) {
        for (let content of commentData) {
            const comment = new Comment({
                username: `User_${Math.floor(Math.random() * 1000)}`,
                content: content,
                post: [post._id],
                time: new Date().toISOString(),
            });
            await comment.save();
            post.comments.push(comment._id);
            comments.push(comment);
        }
        // Save the post after updating its comments
        await post.save();
    }
    console.log("Added 5 comments for each post");
}
