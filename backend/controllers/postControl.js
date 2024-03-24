const Post = require('../models/postModel');

exports.postSnippet = async (req, res) => {
    try {
        //TODO: Add validation
  
        const { content } = req.body;
  
        const post = new Post({
          content,
          user: req.user.id, // Assuming user ID is attached to request after authentication
        });
  
        await post.save();
  
        res.json(post);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
};

exports.getAllUserPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username');
        res.json(posts);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
};

exports.getOnePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Ensure only the user who created the post can delete it
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await post.remove();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


exports.editPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Ensure only the user who created the post can edit it
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update post content
    post.content = req.body.content;
    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


// POST /api/posts/:postId/like
exports.likeAPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user already liked the post
    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }

    // Check if user disliked the post before
    if (post.dislikes.includes(req.user.id)) {
      // Remove user from dislikes array
      post.dislikes.pull(req.user.id);
    }

    // Add user to likes array
    post.likes.push(req.user.id);
    await post.save();

    res.json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// POST /api/posts/:postId/dislike
exports.dislikeAPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    let post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Remove user ID from likes array if present
    post.likes = post.likes.filter(likedBy => likedBy.toString() !== req.user.id);

    // Add user ID to dislikes array if not already present
    if (!post.dislikes.includes(req.user.id)) {
      post.dislikes.push(req.user.id);
    }

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
