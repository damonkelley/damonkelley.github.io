import pluginRss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ public: "/" });


  eleventyConfig.addPlugin(pluginRss);



  const isPublished = (p) => p.data.status === "published";
  eleventyConfig.addCollection("feed", (collectionApi) => {
    const articles = collectionApi.getFilteredByTag("articles").filter(isPublished);
    const notes = collectionApi.getFilteredByTag("notes").filter(isPublished);
    return [...articles, ...notes].sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("readableDateTime", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  eleventyConfig.addFilter("year", () => {
    return new Date().getFullYear();
  });

  eleventyConfig.addFilter("excerpt", (content) => {
    if (!content) return "";
    const plain = content.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    return plain.length > 200 ? plain.slice(0, 200) + "…" : plain;
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    if (!content) return "";
    const words = content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
}
