import { BlogAuthor, BlogPost } from './datasources/sqlData';
import { View } from './datasources/mongoData';

const resolvers = {
    Query: {
        // API Resolver
        posts: (_, args, { dataSources }) => {
            return dataSources.demoAPI.getPosts();
        },

        post: (_, args, { dataSources }) => {
            return dataSources.demoAPI.getPost(args.id);
        },

        // SQL Database Resolver
        blogAuthor: (_, args) => {
            return BlogAuthor.findOne({ where: args });
        },
    },

    BlogAuthor: {
        // SQL Database Resolver
        blogPosts: (blogAuthor, { limit }) => {
            return blogAuthor.getPosts({limit});
        },
    },

    BlogPost: {
        // SQL Database Resolver
        blogAuthor: (blogPost) => {
            return blogPost.getAuthor();
        },

        // Mongo Database Resolver
        views: (blogPost) => {
            return View.findOne({ blogPostId: blogPost.id }).then(v => v.views);
        },
    },
}

export { resolvers };