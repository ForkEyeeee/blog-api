import { Request, Response, NextFunction } from "express";
var express = require("express");
var router = express.Router();
const post_controller = require("../controllers/post_controller");
const comment_controller = require("../controllers/comment_controller");
const auth_controller = require("../controllers/auth_controller");
/* GET home page. */
// router.get("/", (req, res) => {
//   res.redirect("/posts");
// });
//Index routes
// router.get("/session/new", index_controller.login_form_get);
// router.get("/membership", index_controller.membership_form_get);
// router.post("/membership", index_controller.membership_form_post);
//Auth routes
// router.post("/users/new", auth_controller.sign_up_form_post);
// router.post("/session/new", auth_controller.login_form_post);
router.get("/posts/:postid", post_controller.post_get);

// // router.get("/logout", auth_controller.logout_get);

// //Post routes
// // router.post("/posts", post_controller.create_post_form_post);
// router.get("/posts/:postid", post_controller.post_get);
// // router.put("/posts/:postid", post_controller.update_post_form_put);
// // router.get("/posts/:postid", post_controller.delete_post_form_get);
// // router.delete("/posts/:postid", post_controller.delete_post_form_delete);
router.get("/posts", post_controller.post_list_get);
router.post("/session/new", auth_controller.login_form_post);
router.post("/posts/:postid", comment_controller.create_comment_form_post);

// //Comment routes
// router.get("/comments", comment_controller.comment_list_get);
// router.post("/comments", comment_controller.create_comment_form_post);
// router.get("/comments/:commentid", comment_controller.update_comment_form_get);
// router.put("/comments/:commentid", comment_controller.update_comment_form_put);
// router.get("/comments/:commentid", comment_controller.delete_comment_form_get);
// router.delete(
//   "/comments/:commentid",
//   comment_controller.delete_comment_form_delete
// );

//unprotectedRoutes.ts

module.exports = router;
