export default {
  layout: "post.njk",
  tags: "articles",
  status: "draft",
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) => data.status === "draft",
    permalink: (data) => data.status === "draft" ? false : data.permalink,
  },
};
