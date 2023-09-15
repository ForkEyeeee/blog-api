var express = require("express");
var router = express.Router();
const comment_controller = require("../controllers/comment_controller");
const auth_controller = require("../controllers/auth_controller");

router.post("/posts/:postid", comment_controller.create_comment_form_post);
router.put("/posts/:postid", comment_controller.update_comment_form_put);

router.delete("/posts/:postid", comment_controller.delete_comment_form_delete);

router.get("/authorsession/posts", auth_controller.authorsession_get);
router.put("/authorsession/posts", auth_controller.authorsession_put);
router.post("/authorsession/posts", auth_controller.create_post_post);

module.exports = router;
