const { findUserById } = require("../auth/auth.repo")
const blogRepo = require('./blog.repo');

async function createBlog(title, body, authorId) {
    //check if user exists
    const userExists = await findUserById(authorId)
    if (!userExists) throw new Error('user not found.')

    //create blog
    const createdBlog = await blogRepo.createBlog(title, body, authorId)
    return createdBlog;
}

async function softDeleteBlog(id, authorId) {
    
    //go to repo and delete
    const deletedBlog = await blogRepo.softDeleteBlog(id, authorId)

    if (!deletedBlog) throw new Error('Blog not found.')

    return deletedBlog;

}

async function hardDeleteBlog(id, authorId) {
    const deletedBlog = await blogRepo.hardDeleteBlog(id, authorId)

    if (!deletedBlog) throw new Error('Blog not found.')

    return;
}

async function restoreBlog(id, authorId) {
    const restoredBlog = await blogRepo.restoreBlog(id, authorId)

    if (!restoredBlog) throw new Error('blog not found.')

    return restoredBlog;
}

async function getBlog(id, authorId) {

    const blog = await blogRepo.getBlog(id, authorId)

    if (!blog) throw new Error('blog not found.')

    return blog;
}

async function updateBlog(id, authorId, title, body){

    const updatedBlog = await blogRepo.updateBlog(id, authorId, title, body)

    if (!updatedBlog) throw new Error('blog not found.')

    return updatedBlog;
}


module.exports = {
    createBlog,
    softDeleteBlog,
    hardDeleteBlog,
    restoreBlog,
    getBlog,
    updateBlog
}