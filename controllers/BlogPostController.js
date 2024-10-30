import { validationResult } from "express-validator";
import { BlogPost } from "../models/blogPost.js";
import uploadImage from "../middlewares/multer-config.js"; // Adjust the path as needed

// Backend controller for fetching blog posts with search and sorting
export function getAllBlogPosts(req, res) {
    const search = req.query.search || '';
    const sortField = req.query.sortField || 'dateOfCreation';
    const sortOrder = req.query.sortOrder || 'desc';

    BlogPost.find({
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } }
        ]
    })
        .sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 })
        .then((posts) => {
            const modifiedPosts = posts.map(post => ({
                id: post._id.toString(),
                title: post.title,
                content: post.content,
                author: post.author,
                tags: post.tags,
                dateOfCreation: post.dateOfCreation,
                upVotes: post.upVotes,
                downVotes: post.downVotes,
                images: post.images,
                comments: post.comments
            }));
            res.status(200).json(modifiedPosts);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}



// Create a new blog post
export const createBlogPost = [
    (req, res, next) => {
        uploadImage('image', { fileSize: 5 * 1024 * 1024 })(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: "Image upload failed" });
            }
            next();
        });
    },
    (req, res) => {
        console.log('Received create blog post request');
        console.log('Request body:', req.body);
        console.log('Uploaded files:', req.file);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content, author, tags } = req.body;
        const images = req.file ? [req.file.filename] : [];


        BlogPost.create({ title, content, author, tags, images })
            .then((newPost) => {
                res.status(201).json(newPost);
            })
            .catch((err) => {
                console.error('Error creating blog post:', err);
                res.status(500).json({ error: err });
            });
    }
];

// Get a single blog post by ID
export function getBlogPostById(req, res) {
    BlogPost.findById(req.params.id)
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            res.status(200).json(post);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

// Update a blog post
export const updateBlogPost = [
    (req, res, next) => {
        uploadImage('image', { fileSize: 5 * 1024 * 1024 })(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: "Image upload failed" });
            }
            next();
        });
    },
    (req, res) => {
        console.log(`Update Blog Post ID: ${req.params.id}`);
        console.log('Request Body:', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const updateData = req.body;
        if (req.file) {
            updateData.images = [req.file.filename];
        }

        BlogPost.findByIdAndUpdate(req.params.id, updateData, { new: true })
            .then((updatedPost) => {
                if (!updatedPost) {
                    return res.status(404).json({ message: 'Blog post not found' });
                }
                res.status(200).json(updatedPost);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
];

// Delete a blog post
export function deleteBlogPost(req, res) {
    BlogPost.findByIdAndDelete(req.params.id)
        .then((deletedPost) => {
            if (!deletedPost) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            res.status(200).json({ message: 'Blog post deleted successfully' });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

// Add a comment to a blog post
export function addCommentToBlogPost(req, res) {
    console.log(`Update Comment in Blog Post ID: ${req.params.id}`);
    console.log(`Comment ID: ${req.params.commentId}`);
    console.log('Request Body:', req.body);
    const { commentAuthor, content } = req.body;
    BlogPost.findById(req.params.id)
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            post.comments.push({ commentAuthor, content });
            return post.save();
        })
        .then((updatedPost) => {
            res.status(201).json(updatedPost);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

// Update a comment in a blog post
export function updateCommentInBlogPost(req, res) {
    const { commentAuthor, content } = req.body;
    BlogPost.findById(req.params.id)
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            const comment = post.comments.id(req.params.commentId);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            comment.commentAuthor = commentAuthor;
            comment.content = content;
            return post.save();
        })
        .then((updatedPost) => {
            res.status(200).json(updatedPost);
        })
        .catch((err) => {
            if (!res.headersSent) {
                res.status(500).json({ error: err.message });
            }
        });
}


// Delete a comment from a blog post
export function deleteCommentFromBlogPost(req, res) {
    BlogPost.findById(req.params.id)
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            const comment = post.comments.id(req.params.commentId);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            comment.remove();
            return post.save();
        })
        .then((updatedPost) => {
            res.status(200).json(updatedPost);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

// Search blog posts by text
export function searchBlogPosts(req, res) {
    const searchText = req.query.search;
    BlogPost.find({
        $or: [
            { title: { $regex: searchText, $options: 'i' } },
            { content: { $regex: searchText, $options: 'i' } }
        ]
    })
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

// Filter blog posts by upvotes
export function filterBlogPostsByUpvotes(req, res) {
    BlogPost.find({}).sort('-upVotes')
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

// Filter blog posts by author
export function filterBlogPostsByAuthor(req, res) {
    const author = req.query.author;
    if (!author) {
        return res.status(400).json({ message: 'Author is required' });
    }
    BlogPost.find({ author: author })
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

// Filter blog posts by upvotes ascending
export function filterBlogPostsByUpvotesAsc(req, res) {
    BlogPost.find({}).sort('upVotes')
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

// Filter blog posts by upvotes descending
export function filterBlogPostsByUpvotesDesc(req, res) {
    BlogPost.find({}).sort('-upVotes')
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}


// Upvote a blog post
export function upvoteBlogPost(req, res) {
    BlogPost.findById(req.params.id)
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            post.upVotes += 1;
            return post.save();
        })
        .then((updatedPost) => {
            res.status(200).json(updatedPost);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

// Downvote a blog post
export function downvoteBlogPost(req, res) {
    BlogPost.findById(req.params.id)
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            post.downVotes += 1;
            return post.save();
        })
        .then((updatedPost) => {
            res.status(200).json(updatedPost);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

// Toggle comments for a blog post
export function toggleComments(req, res) {
    const postId = req.params.id;

    BlogPost.findById(postId)
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            post.disableComments = !post.disableComments;
            return post.save();
        })
        .then((updatedPost) => {
            res.status(200).json(updatedPost);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
}



