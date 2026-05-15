export function HeroBackground() {
  return (
    <picture className="absolute inset-0 z-0 block h-full w-full">
      <source
        srcSet="/hero_desktop.webp"
        media="(min-width:768px)"
        type="image/webp"
        width={1677}
        height={938}
      />
      <source
        srcSet="/hero_mobile.webp"
        type="image/webp"
        width={1677}
        height={938}
      />
      <img
        src="/hero_mobile.png"
        className="h-full w-full object-cover"
        alt=""
        width={853}
        height={1844}
        loading="eager"
        fetchPriority="high"
      />
    </picture>
  );
}
