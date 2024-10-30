import express from 'express';
import {
    getAllBlogPosts,
    createBlogPost,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
    addCommentToBlogPost,
    deleteCommentFromBlogPost,
    updateCommentInBlogPost, // Include update comment function
    searchBlogPosts,
    filterBlogPostsByUpvotes,
    filterBlogPostsByAuthor,
    filterBlogPostsByUpvotesAsc,
    filterBlogPostsByUpvotesDesc,
    upvoteBlogPost,
    downvoteBlogPost,
    toggleComments
} from '../controllers/blogPostController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'public/images/' });

// Route to get all blog posts
router.get('/', getAllBlogPosts);

// Route to create a new blog post
router.post('/', upload.array('images', 10), createBlogPost); // Adjust the number of images as needed

// Route to upload an image
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(200).json({ url: `/img/${req.file.filename}` });
});

// Route to get a specific blog post by ID
router.get('/:id', getBlogPostById);

// Route to update a blog post by ID
router.put('/:id', upload.array('images', 10), updateBlogPost); // Adjust the number of images as needed

// Route to delete a blog post by ID
router.delete('/:id', deleteBlogPost);

// Route to add a comment to a blog post
router.post('/:id/comments', addCommentToBlogPost);

// Route to delete a comment from a blog post
router.delete('/:id/comments/:commentId', deleteCommentFromBlogPost);

// Route to update a comment in a blog post
router.put('/:id/comments/:commentId', updateCommentInBlogPost); // Add route for updating comments

// Route to search blog posts by text
router.get('/search', searchBlogPosts);

// Route to filter blog posts by upvotes
router.get('/filter/upvotes', filterBlogPostsByUpvotes);

// Route to filter blog posts by author
router.get('/filter/author', filterBlogPostsByAuthor);

// Route to filter blog posts by upvotes ascending
router.get('/filter/upvotes/asc', filterBlogPostsByUpvotesAsc);

// Route to filter blog posts by upvotes descending
router.get('/filter/upvotes/desc', filterBlogPostsByUpvotesDesc);

// Add routes for upvoting and downvoting
router.post('/:id/upvote', upvoteBlogPost);
router.post('/:id/downvote', downvoteBlogPost);

router.put('/blogpost/:id/toggle-comments', toggleComments);

export default router;
