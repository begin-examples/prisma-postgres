let { PrismaClient } = require('./prisma/generated/client')
let prisma = new PrismaClient()

exports.handler = async function http () {
  let dbQuery
  try {
    console.time('prisma query')
    await prisma.$connect()
    dbQuery = await prisma.post.findMany({ where: { published: false } })
    await prisma.$disconnect()
    console.timeEnd('prisma query')
  }
  catch (e) {
    console.log(e)
  }
  let firstTitle = dbQuery[0].title
  let html = `
<!doctype html>
<html lang=en>
  <head>
    <meta charset=utf-8>
    <title>Prisma Example</title>
    <link rel="stylesheet" href="https://static.begin.app/starter/default.css">
  </head>
  <body>

    <h1 class="center-text">
      Prisma Query Results
    </h1>

    <p class="center-text">
      The title for the first post is: ${firstTitle}
    </p>

  </body>
</html>`

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8',
    },
    body: html,
  }
}
