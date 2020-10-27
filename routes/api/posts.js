const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middlewares/auth");
const {
  addPost,
  updatePost,
  getPosts,
  getPost,
  deletePost,
  addLikes,
  addUnlikes,
  addComments,
  deleteComment,
} = require("../../controllers/post.controller");

// @route   POST api/posts
// @desc    Add a post
// @access  Private
router.post(
  "/",
  [auth, [check("text", "This field is required").not().isEmpty()]],
  async (req, res) => {
    await addPost(req, res);
  }
);

// @route   PUT /api/posts/edit/:id
// @desc    Edit post by ID
// @access  Private
router.put("/edit/:id", auth, async (req, res) => {
  await updatePost(req, res);
});

// @route   GET api/posts
// @desc    Get all the post
// @access  Private

router.get("/", auth, async (req, res) => {
  await getPosts(req, res);
});

// @route   GET api/posts/:id
// @desc    Get the post by id
// @access  Private

router.get("/:id", auth, async (req, res) => {
  await getPost(req, res);
});

// @route   DELETE api/posts/:id
// @desc    delete the post by id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  await deletePost(req, res);
});

// @route   PUT api/posts/like/:id
// @desc    Add like the post by id
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
  await addLikes(req, res);
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike the post by id
// @access  Private
router.put("/unlike/:id", auth, async (req, res) => {
  await addUnlikes(req, res);
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to the post
// @access  Private
router.post(
  "/comment/:id",
  [auth, [check("text", "This field is required").not().isEmpty()]],
  async (req, res) => {
    await addComments(req, res);
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    remove comment from the post
// @access  Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  await deleteComment(req, res);
});
module.exports = router;
