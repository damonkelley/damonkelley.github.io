import type { CollectionEntry } from 'astro:content';

export function generateWordCloudSvg(posts: CollectionEntry<'blog'>[]): string {
  // Stop words to filter out
  const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is', 'are', 'was', 'were', 'been', 'has', 'had', 'did', 'does', 'can', 'may', 'might', 'must', 'shall', 'should', 'will', 'would']);

  // Extract words and calculate frequency
  const wordFreq = new Map<string, number>();

  posts.forEach(post => {
    const content = post.body || '';
    const words = content.toLowerCase()
      .replace(/[^a-z\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.has(word));

    words.forEach(word => {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    });
  });

  // Get top 80 words
  const topWords = Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 80)
    .map(([word, freq]) => ({ word, freq }));

  // Calculate font sizes
  const maxFreq = Math.max(...topWords.map(w => w.freq));
  const minFreq = Math.min(...topWords.map(w => w.freq));
  const range = maxFreq - minFreq || 1;

  // Simple seeded random for consistent builds
  let seed = 12345;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const words = topWords.map(({ word, freq }) => ({
    word,
    size: 40 + ((freq - minFreq) / range) * 120,
    x: random() * 1920,
    y: random() * 1080,
    rotation: (random() - 0.5) * 180
  }));

  // Generate SVG as a string
  const svgTexts = words.map(({ word, size, x, y, rotation }) =>
    `<text x="${x}" y="${y}" font-size="${size}" opacity="${0.4 + (size / 5) * 0.6}" transform="rotate(${rotation} ${x} ${y})" text-anchor="middle" dominant-baseline="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-weight="700" letter-spacing="-0.03em">${word}</text>`
  ).join('');

  const svgString = `<svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${svgTexts}</svg>`;
  return encodeURIComponent(svgString).replace(/'/g, '%27');
}
