let { PrismaClient } = require('./prisma/generated/client')
let prisma = new PrismaClient()

exports.handler = async function http () {
  let query
  try {
    await prisma.$connect()
    query = await prisma.post.findMany({ where: { published: false } })
    await prisma.$disconnect()
  }
  catch (e) {
    console.log(e)
  }
  let output = JSON.stringify(query)
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json; charset=utf8',
    },
    body: output,
  }
}
