export function AboutBackground() {
  return (
    <div className="inset-x absolute z-0 h-full w-full overflow-hidden">
      <picture>
        <source
          src="/about-us/about_us_bg_desktop.webp"
          media="(min-width:1024px)"
          type="image/webp"
        />
        <source src="/about-us/about_us_bg_mobile.webp" type="image/webp" />
        <img
          src="/about-us/about_us_bg_mobile.png"
          alt=""
          className="block h-full w-full object-cover"
          loading="lazy"
        />
      </picture>
    </div>
  );
}
