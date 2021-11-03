import Sequelize from "sequelize";
import casual from "casual";
import _ from "lodash";
import { View } from "./mongoData";

const db = new Sequelize("blog", null, null, {
  dialect: "sqlite",
  storage: "./blog.sqlite",
});

const AuthorModel = db.define("author", {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

const PostModel = db.define("post", {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

/*
// Data Seeder

casual.seed(123);

db.sync({ force: true }).then(() => {
  _.times(10, () => {
    AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    })
      .then((author) => {
        const post1 = author.createPost({
          title: `A post 1  by ${author.firstName}`,
          text: casual.sentences(1),
        });
        const post2 = author.createPost({
          title: `A post 2 by ${author.firstName}`,
          text: casual.sentences(2),
        });
        const post3 = author.createPost({
          title: `A post 3 by ${author.firstName}`,
          text: casual.sentences(3),
        });

        return { post1, post2, post3 };
      })
      .then(({ post1, post2, post3 }) => {
        View.updateMany(
          { blogPostId: [post1, post2, post3] },
          { views: casual.integer(0, 100) },
          { upsert: true }
        );
      });
  });
});
*/

const BlogAuthor = db.models.author;
const BlogPost = db.models.post;

export { BlogAuthor, BlogPost };
