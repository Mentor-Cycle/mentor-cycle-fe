import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <main className="flex flex-col items-center py-16 px-0 flex-1 min-h-screen">
        <h1 className="text-primary-05 text-5xl">style/theme</h1>
        <h1 className="text-primary-04 text-5xl">style/theme</h1>
        <h1 className="text-primary-03 text-5xl">style/theme</h1>
        <h1 className="text-primary-02 text-5xl">style/theme</h1>
        <h1 className="text-primary-01 text-5xl">style/theme</h1>
        <p className="text-gray-05 text-3xl">01</p>
        <p className="text-gray-04 text-3xl">02</p>
        <p className="text-gray-03 text-3xl">03</p>
        <p className="text-gray-02 text-3xl">04</p>
        <p className="text-gray-01 text-3xl">05</p>
        <div className="bg-primary-05 p-4">
          <p className="text-neutral-05 text-3xl">01</p>
          <p className="text-neutral-04 text-3xl">02</p>
          <p className="text-neutral-03 text-3xl">03</p>
          <p className="text-neutral-02 text-3xl">04</p>
          <p className="text-neutral-01 text-3xl">05</p>
        </div>
        <button className="bg-link-02 text-neutral-04 px-4 py-2">button</button>
      </main>
    </div>
  );
};

export default Home;
