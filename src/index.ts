import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up(); //runs migrations
  const emFork = orm.em.fork(); // create the fork

  // use the fork instead of global `orm.em`
  const post = emFork.create(Post, { title: "my first post" });

  //Create a post and insert to database:
  // is equavelent to const post = new Post("my first post");
  //const post = orm.em.create(Post, { title: "my first post2" });

  // puts the Post to database
  await emFork.persistAndFlush(post);

  //Gets all the post in database, it returns promise so we need to use await
  const posts = await emFork.find(Post, {});
  console.log(posts);
};

main().catch((err) => {
  console.error(err);
});
