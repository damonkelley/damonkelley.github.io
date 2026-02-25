export default {
  layout: "layouts/post.njk",
  tags: "articles",
  status: "draft",
  federate: true,
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) =>
      data.status === "draft" || data.status === "hidden",
    permalink: (data) => data.status === "draft" ? false : data.permalink,
  },
};
