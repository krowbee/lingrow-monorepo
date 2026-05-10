import { ShowcaseArticle } from "./showcase/ShowcaseArticle";
import { ShowcaseVideo } from "./showcase/ShowcaseVideo";

export function FeatureShowcase() {
  return (
    <section className="flex h-screen w-full flex-row bg-linear-to-b from-purple-950/30 via-slate-950 to-slate-900 px-4 py-4 md:px-16 md:py-24">
      <ShowcaseArticle />
      <ShowcaseVideo />
    </section>
  );
}
