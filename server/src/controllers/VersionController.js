const {Version} = require('../models')

module.exports = {
    async index (req, res) {
        try {
            let versions = null
            const search = req.query.search
            if (search) {
                versions = await Version.findAll({
                    where: {
                        $or: [
                            'manufacturer', 'model'
                        ].map(key => ({
                            [key]: {
                            $like: `%${search}%`
                        }
                    }))
                }
            })
            } else {
                versions = await Version.findAll({
                    order: [
                        ['updatedAt', 'DESC'],
                    ],
                    limit:10
                })
            }
            res.send(versions)
        } catch (err) {
            res.status(500).send({
                error : 'Some error occured'
            })
        }   
    },

    async show (req, res) {
        try {
            const version = await Version.findById(req.params.versionId)
            res.send(version)
        } catch (err) {
            res.status(500).send({
                error : 'Some error occured'
            })
        }   
    },
    
    async post (req, res) {
        try {
            const version = await Version.create(req.body)
            res.send(version)
        } catch (err) {
            res.status(500).send({
                error : 'Some error occured'
            })
        }   
    },
    
    async put (req, res) {
        try {
            const version = await Version.update(req.body, {
                where: {
                    id: req.params.versionId
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
            const { versionId } = req.params
            const version = await Version.findById(versionId)
            await version.destroy()
            res.send(version)
        } catch (err) {
            res.status(500).send({
                error : 'Some error occured'
            })
        }   
    },
}