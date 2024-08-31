import sideLeaves from "../assets/sideLeaves.png";
export default function Hero() {
  return (
    <section className="bg-lightGreen flex w-[90%] items-center justify-between rounded-xl">
      <div className="flex flex-col gap-2 p-5">
        <header className="text-5xl font-bold">
          Your Plant's Personal Doctor
        </header>
        <p className="text-lg font-medium">Plant Care Made Easy</p>
        <button className="bg-darkBrown mt-2 w-fit rounded-xl px-3 py-3 text-white">
          Explore our features
        </button>
      </div>
      <img src={sideLeaves} className="rounded-xl" />
    </section>
  );
}
