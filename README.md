## Begin Prisma Example
This example demonstrates a simple query to an externally hosted Postgres Database using the [Prisma](https://www.prisma.io/) client. 

## Deploy your own

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/prisma-postgres)

Deploy your own clone of this app to Begin!

## Getting started
To deploy to staging on Begin set environment variables for your hosted Database:
  - Set `DATABASE_URL` in both the "staging" and "testing" sections. Note that the "testing" environment is also the build container for Begin. The Prisma builds the client during this stage so the environment variable needs to be set for both.

**For local testing point to a hosted testing database by setting environment variable for `DATABASE_URL` in the `.env` file.** See the example in `.env.example` for reference. This is a departure from most Begin apps because the Prisma CLI specifically looks for the `.env` file. To start the sandbox run `npm start`. 

## Prisma Schema Management
Prisma CLI has many utilities for managing schema changes. For instance in this example `npm run db-pull` will introspect the hosted database and update the local schema file to match it. These utilities are powerful, but they can also lead to lost data if used incorrectly (i.e. `npm run db-push` will change the database schema to match the local schema file). Review Prisma documentation for specifics.

## Managing Connections
Postgres and most other relational databases have a limit to the number of open connections they can support. Since your serverless application can scale up quickly it is possible overload those connections. There are several approaches to managing this:
1. Set a concurrency limit for any function in your app that may attempt to query the database. This can be done in the `config.arc` file in the `src` directory for each endpoint. 
2. Reuse connections speed up some queries. Lambda will reuse containers for functions if possible. Connections from that container can be used again for the next invocation. This technique is described by Jeremy Daly ([How To: Reuse Database Connections in AWS Lambda](https://www.jeremydaly.com/reuse-database-connections-aws-lambda/)).
2. Use a service to manage connections such as [AWS RDS Proxy](https://aws.amazon.com/rds/proxy/).
3. Host your own connection pooling server like [pg-bouncer](https://github.com/pgbouncer/pgbouncer).
4. Or try DynamoDB (available on Begin through [Begin Data](https://docs.begin.com/en/data/begin-data)) that does not have this limitation.

## Reference

-   [Quickstart](https://docs.begin.com/en/guides/quickstart/) - basics on working locally, project structure, deploying, and accessing your Begin app
-   [Creating new routes](https://docs.begin.com/en/functions/creating-new-functions) - basics on expanding the capabilities of your app

Head to [docs.begin.com](https://docs.begin.com/) to learn more!
