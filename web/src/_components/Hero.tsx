import sideLeaves from "../assets/sideLeaves.png";
export default function Hero() {
  return (
    <section className="bg-lightGreen flex w-[95%] items-center justify-between rounded-xl lg:w-[90%]">
      <div className="flex flex-col gap-2 p-5">
        <header className="text-2xl font-bold sm:text-4xl lg:text-5xl">
          Your Crop's Personal Doctor
        </header>
        <p className="text-md font-medium sm:text-lg">Crop Care Made Easy</p>
        <button className="bg-darkBrown sm:text-md mt-2 w-fit rounded-xl px-3 py-3 text-sm text-white">
          Explore our features
        </button>
      </div>
      <img src={sideLeaves} className="hidden rounded-xl lg:block" />
    </section>
  );
}
