import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getBlogs() {
  const files = fs.readdirSync(CONTENT_DIR);

  return files.map((file) => {
    const filePath = path.join(CONTENT_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
  const matterResult = matter(fileContent);
  console.log("matterResult",matterResult);
})
}