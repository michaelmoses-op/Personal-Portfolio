/** Normalize frontmatter tag strings for filtering (case-insensitive, punctuation-insensitive). */
export function normalizeTechTagKey(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/\.js$/i, '')
    .replace(/[^a-z0-9+#]+/g, '');
}

export type ProjectTag = {
  key: string;
  label: string;
  count: number;
};

export function collectProjectTags(
  posts: { frontmatter: { tags?: string[] } }[],
): ProjectTag[] {
  const tagMap = new Map<string, { label: string; count: number }>();

  for (const post of posts) {
    for (const tag of post.frontmatter.tags ?? []) {
      const key = normalizeTechTagKey(tag);
      if (!key) continue;
      const existing = tagMap.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        tagMap.set(key, { label: tag.trim(), count: 1 });
      }
    }
  }

  return Array.from(tagMap.entries())
    .map(([key, { label, count }]) => ({ key, label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}
