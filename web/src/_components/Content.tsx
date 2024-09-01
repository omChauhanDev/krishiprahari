import Hero from "./Hero";
import UploadImage from "./UploadImage";
export default function Content() {
  return (
    <section className="bg-lightGreen flex h-full w-full grow flex-col items-center justify-center gap-10 overflow-y-auto pb-5">
      <Hero />
      <UploadImage />
    </section>
  );
}
