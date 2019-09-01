const {Blog} = require('../models')

module.exports = {
    async index (req, res) {
        try {
            let blogs = null
            const search = req.query.search
            if (search) {
                blogs = await Blog.findAll({
                    where: {
                        $or: [
                            'title', 'body'
                        ].map(key => ({
                            [key]: {
                            $like: `%${search}%`
                        }
                    }))
                }
            })
            } else {
                blogs = await Blog.findAll({
                    order: [
                        ['updatedAt', 'DESC'],
                    ],
                    limit:5
                })
            }
            res.send(blogs)
        } catch (err) {
            res.status(500).send({
                error : 'Some error occured'
            })
        }   
    },

    async show (req, res) {
        try {
            const blog = await Blog.findById(req.params.blogId)
            res.send(blog)
        } catch (err) {
            res.status(500).send({
                error : 'Some error occured'
            })
        }   
    },
    
    async post (req, res) {
        try {
            const blog = await Blog.create(req.body)
            res.send(blog)
        } catch (err) {
            res.status(500).send({
                error : 'Some error occured'
            })
        }   
    },
    
    async put (req, res) {
        try {
            const blog = await Blog.update(req.body, {
                where: {
                    id: req.params.blogId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error : 'Some error occured'
            })
        }   
    },

    async delete (req, res) {
        try {
            const { blogId } = req.params
            const blog = await Blog.findById(blogId)
            await blog.destroy()
            res.send(blog)
        } catch (err) {
            res.status(500).send({
                error : 'Some error occured'
            })
        }   
    },
}