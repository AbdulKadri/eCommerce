import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";

export default defineConfig({
  basePath: "/admin",
  projectId: "ic8uro0v",
  title: "eCommerce Sanity Studio",
  dataset: "production",
  apiVersion: "2023-05-23",
  plugins: [deskTool()],
  schema: { types: schemas },
});
