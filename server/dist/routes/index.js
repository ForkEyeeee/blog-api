"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
const post_controller = require("../controllers/post_controller");
const comment_controller = require("../controllers/comment_controller");
/* GET home page. */
router.get("/", (req, res) => {
    res.json({ message: "Homepage" });
});
//Post routes
// router.get("/posts", post_controller.create_post_form_get);
router.post("/posts", post_controller.create_post_form_post);
router.get("/posts/:postid", post_controller.update_post_form_get);
router.put("/posts/:postid", post_controller.update_post_form_put);
router.get("/posts/:postid", post_controller.delete_post_form_get);
router.delete("/posts/:postid", post_controller.delete_post_form_delete);
router.get("/posts", post_controller.post_list_get);
//Comment routes
router.get("/comments", comment_controller.comment_list_get);
router.post("/comments", comment_controller.create_comment_form_post);
router.get("/comments/:commentid", comment_controller.update_comment_form_get);
router.put("/comments/:commentid", comment_controller.update_comment_form_put);
router.get("/comments/:commentid", comment_controller.delete_comment_form_get);
router.delete("/comments/:commentid", comment_controller.delete_comment_form_delete);
module.exports = router;
