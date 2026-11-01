const blogService = require('./blog.service')

async function createBlog(req, res, next) {
    try {
        const { title, body } = req.body;
        const { userId: authorId } = req.user

        if (!title || !body || !authorId) throw new Error('missing input');

        const createdBlog = await blogService.createBlog(title, body, authorId);

        res.status(201).json({
            message: 'created blog successfully',
            success: true,
            data: createdBlog
        })

    } catch (error) {
        next(error)
    }
}

async function softDeleteBlog(req, res, next) {

    try {
        const { id } = req.params
        const { userId: authorId } = req.user

        const deletedBlog = await blogService.softDeleteBlog(Number(id), authorId)

        res.status(200).json({
            message: "deleted blog successfully",
            success: true,
            data: deletedBlog
        })
    } catch (error) {
        next(error)
    }
}

async function restoreBlog(req, res, next) {

    try {
        const { id } = req.params
        const { userId: authorId } = req.user

        const restoredBlog = await blogService.restoreBlog(Number(id), authorId)

        res.status(200).json({
            message: "restored blog successfully",
            success: true,
            data: restoredBlog
        })

    } catch (error) {
        next(error)
    }
}

async function getBlog(req, res, next) {
    const { id } = req.params
    const { userId: authorId } = req.user
    
    const blog = await blogService.getBlog(Number(id), authorId)

    res.status(200).json({
        message: 'retrieved blog successfully',
        success: true,
        data: blog
    })
}

async function updateBlog(req, res, next) {
    const { id } = req.params;
    const { userId: authorId } = req.user;

    const oldBlog = await blogService.getBlog(Number(id), authorId)

    const blogData = Object.assign(oldBlog, req.body)
    const {title, body} = blogData
    
    const updatedBlog = await blogService.updateBlog(Number(id), authorId, title, body)

    res.status(200).json({
        message: 'updated blog successfully',
        success: true,
        data: updatedBlog
    })
}
module.exports = {
    createBlog,
    softDeleteBlog,
    restoreBlog,
    getBlog,
    updateBlog
} 