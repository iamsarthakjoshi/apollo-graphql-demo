import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Query {
        posts: [Post]
        post(id: Int!): Post
        blogAuthor(firstName: String, lastName: String): BlogAuthor
    }
    type Post {
        id: Int!
        title: String
        body: String
        userId: Int!
    }
    type BlogAuthor {
        id: Int!
        firstName: String
        lastName: String
        blogPosts(limit: Int): [BlogPost]
    }
    type BlogPost {
        id: Int
        title: String
        text: String
        views: Int
        blogAuthor: BlogAuthor
    }
`;

export { typeDefs };

/*
Default scalar types
Int:     A signed 32‐bit integer.
Float:   A signed double-precision floating-point value.
String:  A UTF‐8 character sequence.
Boolean: true or false.
ID:      The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache.


Specify custom scalar types
Date:   For example, you could specify that the Date type should always be serialized into an integer timestamp, and your client should know to expect that format for any date fields.
ENUM
*/ 