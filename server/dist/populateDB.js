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
        {
            title: "The beauty of Nature",
            content: "Nature has always fascinated humankind. From the towering mountains to the gentle streams, nature showcases its beauty in myriad ways. The changing seasons, the blooming flowers, and the mesmerizing sunsets are just a few examples of the beauty that nature offers.",
        },
        {
            title: "Exploring the World of AI",
            content: "Artificial Intelligence is shaping the future. From automation to predicting patterns, AI offers vast possibilities. Its influence on various industries, including healthcare, finance, and entertainment, has been revolutionary.",
        },
        {
            title: "Adventures in the Himalayas",
            content: "The Himalayas stand tall, representing the pinnacle of nature's grandeur. Trekking through its terrains gives a unique experience, offering both challenges and spectacular views. The rich flora and fauna found here are unparalleled.",
        },
        {
            title: "The Mysterious Oceans",
            content: "Oceans cover the majority of our planet, yet we've explored only a fraction of them. The deep blue waters hide mysteries waiting to be discovered. From colorful corals to diverse marine life, oceans are nature's treasure trove.",
        },
        {
            title: "Journey through Middle Earth",
            content: "Middle Earth, a creation of J.R.R. Tolkien, is a land of fantasy. From the Shire to Mordor, it's filled with diverse landscapes, cultures, and stories. The epic tales of heroism, friendship, and adventure are timeless.",
        },
    ];
    for (let postDetails of postData) {
        const post = new Post({
            title: postDetails.title,
            content: postDetails.content,
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
                post: post._id,
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
