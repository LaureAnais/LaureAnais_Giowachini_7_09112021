module.exports = {
    port: process.env.PORT || 3001, 
    db: {
        database: process.env.DB_NAME || 'groupomania' ,
        user: process.env.DB_USER || 'root' ,
        password: process.env.DB_PASS || 'projetUSER!2021' ,
        options: {
            dialect: process.env.DIALECT || 'mysql',
            host: process.env.HOST || 'localhost',
            storage: './groupomania'
        }
    }
}
