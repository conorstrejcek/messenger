# Messenger

A demo app which allows two users to send messages to each other.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Install dependencies:

    ```bash
    npm i
    ```

2. Initialize the SQLite database file:

    ```bash
    npm run initialize-db
    ```

    This script will create the database file, and seed it with two users.

3. Run the development server:

    ```bash
    npm run dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

You can select which user you would like to send as by clicking one of the buttons on the home page. If you would like to test sending and receiving, you can open the application in another tab or window, and select the other user. From the next page, you can send and receive messages using the input at the bottom of the page.

## Project Architecture

| Component                 | Technology       |
|---------------------------|------------------|
| Application Framework     | Next.js          |
| UI Library                | React            |
| Styling Framework         | Tailwind CSS     |
| GraphQL Client            | Apollo Client    |
| ORM                       | Prisma           |
| Database                  | sqlite           |

| Main Files                                                 | Description                                    |
|------------------------------------------------------------|------------------------------------------------|
| [`pages/api/graphql.ts`](./pages/api/graphql.ts)           | Contains the GraphQL API                       |
| [`pages/index.tsx`](./pages/index.tsx)                     | Home page for user selection                   |
| [`pages/user/[id].tsx`](./pages/user/[id].tsx)             | Page for sending and receiving user messages   |
| Components in [`components/user`](./components/user)       | Components specific to sending/receiving page  |

## Known issues

In development mode, you may sometimes come across this error:

```bash
Error: Ensure bailed, found path does not match ensure type (pages/app)
```

This is a problem in the Next.js which is currently being fixed.

See: <https://github.com/vercel/next.js/issues/53837>

## Future Enhancements

If this were a real project, there are several enhancements which I would prioritize:

1. Server-side validation of client-supplied arguments to GraphQL endpoints
2. Generate types from GraphQL schema instead of manually updating them, using a package like [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator)
3. Implement GraphQL Subscriptions for realtime messages using WebSockets
