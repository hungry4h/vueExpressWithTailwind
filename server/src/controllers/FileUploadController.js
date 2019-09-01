const {File} = require('../models')

module.exports = {

    /*
    async index (req, res) {
        try {
            const files = await File.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            res.send(files)
            //console.log(isqmsInterfaces)
        } catch (err) {
            res.status(500).send({
                error : '파일 내용을 조회할 수 없습니다'
            })
        }   
    },
    */

    async index (req, res) {
        try {
            let files = null
            const search = req.query.search
            if (search) {
                files = await File.findAll({
                    where: {
                        $or: [
                            'file_name'
                        ].map(key => ({
                            [key]: {
                            $like: `%${search}%`
                        }
                    }))
                }
            })
            } else {
                files = await File.findAll({
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                    limit:10
                })
            }
            res.send(files)
            //console.log(isqmsInterfaces)
        } catch (err) {
            res.status(500).send({
                error : '리스트 페이지를 출력할 수 없습니다'
            })
        }   
    },

    async download (req, res) {
        try {
            const file = await File.findById(req.params.fileId)
            const file_path = file.file_path
            const file_name = file.file_name
            //res.writeHead(200, {"Content-Type": "application/octet-stream", "Content-Disposition": "attacthment; filename=" + file_name})
            res.download(file_path, file_name)
        } catch (err) {
            res.status(500).send({
                error : 'index() error'
            })
        }   
    },
   
    async post (req, res) {
        try {
            const file = await File.create({
                file_name : req.file.filename,
                file_path : req.file.path,
                file_size : req.file.size,
                //desc_title : req.body.desc_title,
                //desc_body : req.body.desc_body
            })
            res.send(req.file)
            console.log(req.body)
        } catch (err) {
            res.status(500).send({
                error : 'file upload error'
            })
        }   
    },
}
