/**
 * SEO-friendly image: lazy loading, async decode, explicit dimensions, responsive sizes.
 * Hero / LCP images: pass priority={true} to skip lazy loading.
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
  priority = false,
  ...rest
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={sizes}
      className={className}
      {...rest}
    />
  )
}
