export default {
  layout: "note.njk",
  tags: "notes",
  status: "draft",
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) => data.status === "draft",
    description: (data) => {
      if (data.description) return data.description;
      const raw = data.page?.rawInput || "";
      const body = raw.replace(/^---[\s\S]*?---/, "").trim();
      if (!body) return "";
      return body.length > 200 ? body.slice(0, 200) + "\u2026" : body;
    },
  },
};
