import Hero from "./Hero";
import UploadImage from "./UploadImage";
export default function Content() {
  return (
    <section className="flex h-full w-full grow flex-col items-center justify-center gap-10 overflow-y-auto">
      <Hero />
      <UploadImage />
    </section>
  );
}
