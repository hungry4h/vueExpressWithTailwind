const BlogController = require('./controllers/BlogController')
const FileUploadController = require('./controllers/FileUploadController')
const VersionController = require('./controllers/VersionController')

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '/uploads/'))
        //cb(null, '/uploads/')
    },
    filename: function(req, file, cb) {
        //cb(null, new Date().toISOString + file.originalname)
        cb(null, file.originalname)
    }
})

const upload = multer({ storage : storage })

module.exports = (app) => {
    //blog route
    app.get('/blogs',
        BlogController.index)
    app.get('/blog/:blogId',
        BlogController.show)
    app.post('/blog',
        BlogController.post)
    app.put('/blog/:blogId',
        BlogController.put)
    app.delete('/blog/:blogId',
        BlogController.delete)

    //file Upload route
    app.get('/files',
        FileUploadController.index)
    app.get('/file-download/:fileId',
        FileUploadController.download)
    app.post('/fileupload', 
        upload.single('file'),
        FileUploadController.post)

    //blog route
    app.get('/versions',
        VersionController.index)
    app.get('/version/:versionId',
        VersionController.show)
    app.post('/version',
        VersionController.post)
    app.put('/version/:versionId',
        VersionController.put)
    app.delete('/version/:versionId',
        VersionController.delete)
}