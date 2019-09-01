module.exports = {
    port: 3000,
    db: {
        database: process.env.DB_NAME || 'mywork',
        user: process.env.DB_USER || 'hongmae',
        password: process.env.DB_PASS || '1894',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './mywork.sqlite'
        }
    }
}