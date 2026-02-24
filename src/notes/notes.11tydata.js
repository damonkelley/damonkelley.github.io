export default {
  layout: "note.njk",
  tags: "notes",
  status: "draft",
  federate: true,
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) =>
      data.status === "draft" || data.status === "hidden",
    permalink: (data) => data.status === "draft" ? false : data.permalink,
    description: (data) => {
      if (data.description) return data.description;
      const raw = data.page?.rawInput || "";
      const body = raw.replace(/^---[\s\S]*?---/, "").trim();
      if (!body) return "";
      const plain = body
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/(\*\*|__)(.*?)\1/g, "$2")
        .replace(/(\*|_)(.*?)\1/g, "$2")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/^#{1,6}\s+/gm, "")
        .trim();
      return plain.length > 200 ? plain.slice(0, 200) + "\u2026" : plain;
    },
  },
};
