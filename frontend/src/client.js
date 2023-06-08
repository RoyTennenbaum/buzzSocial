import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: "2023-06-06", // use current date (YYYY-MM-DD) to target the latest API version!
  token: process.env.REACT_APP_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) =>
  builder.image(source).fit("clip").format("webp");
