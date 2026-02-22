import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ public: "/" });


  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/rss.xml",
    collection: {
      name: "feed",
      limit: 0,
    },
    metadata: {
      language: "en",
      title: "Damon Kelley",
      subtitle:
        "Writing, building, and thinking about how humans and software shape each other.",
      base: "https://damonkelley.com/",
      author: {
        name: "Damon Kelley",
        email: "mail@damonkelley.com",
      },
    },
  });



  eleventyConfig.addCollection("feed", (collectionApi) => {
    const articles = collectionApi.getFilteredByTag("articles").filter((p) => !p.data.archived);
    const notes = collectionApi.getFilteredByTag("notes");
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

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
}
