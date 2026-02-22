import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ public: "/" });


  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/rss.xml",
    collection: {
      name: "posts",
      limit: 0,
    },
    metadata: {
      language: "en",
      title: "damon kelley",
      subtitle:
        "Writing, building, and thinking about how humans and software shape each other.",
      base: "https://damonkelley.github.io/",
      author: {
        name: "Damon Kelley",
        email: "mail@damonkelley.com",
      },
    },
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

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
}
