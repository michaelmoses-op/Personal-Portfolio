import type { ProjectGalleryItem } from '../components/ProjectGallery.astro';

const VIDEO_EXT = /\.(mp4|webm|ogg|mov)(\?|#|$)/i;
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg)(\?|#|$)/i;

export function isGalleryVideo(item: Pick<ProjectGalleryItem, 'url' | 'type'>): boolean {
  if (!item.url) return false;
  if (IMAGE_EXT.test(item.url)) return false;
  if (VIDEO_EXT.test(item.url)) return true;
  return item.type === 'video';
}

export function normalizeGalleryItem(
  item: Partial<ProjectGalleryItem> & { url: string },
): ProjectGalleryItem {
  const alt = item.alt ?? '';
  if (isGalleryVideo({ url: item.url, type: item.type })) {
    return {
      url: item.url,
      alt,
      type: 'video',
      ...(item.poster ? { poster: item.poster } : {}),
    };
  }
  return { url: item.url, alt };
}
