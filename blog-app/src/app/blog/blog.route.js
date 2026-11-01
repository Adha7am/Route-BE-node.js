const {Router} = require('express');
const authGaurd = require('../../common/Auth/AuthGaurd');
const blogController = require('./blog.controller');

const blogRouter = Router();

blogRouter.post('/', authGaurd, blogController.createBlog)
blogRouter.delete('/:id', authGaurd, blogController.softDeleteBlog)
blogRouter.patch('/:id',  authGaurd, blogController.restoreBlog)
blogRouter.get('/:id',  authGaurd, blogController.getBlog)
blogRouter.put('/:id',  authGaurd, blogController.updateBlog)




module.exports = blogRouter