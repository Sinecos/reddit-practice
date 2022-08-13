import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";

@Entity() //This corresponde to Database table!
export class Post {
  [OptionalProps]?: "createdAt" | "updatedAt";
  // 4 columns in database: id, createAt, updateAt and title
  @PrimaryKey()
  id!: number;

  @Property({ type: "date" }) //@Property is a database column
  createdAt = new Date();

  //onUpdate is hook that is going to create a date everytime we update
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: "text" })
  title!: string;
}
