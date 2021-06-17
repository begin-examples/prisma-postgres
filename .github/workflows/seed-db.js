let { PrismaClient } = require('./src/http/get-index/prisma/generated/client')
let prisma = new PrismaClient()


prisma.$connect()
    .then(() => prisma.post.create({ data: { title: 'Test Title', }, })
        .then(() => prisma.$disconnect()
        )
    )
