const MyLostItemsPage = () => {
  return (
    <main className="my-container">
      <h1 className="text-2xl text-center font-bold mb-10 mt-20">
        My Lost Items
      </h1>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <article className="text-center p-3 rounded-lg border" key={index}>
            {/* <Image src={"/"} alt={"image"} /> */}
            <div className="w-full h-[200px] rounded-lg bg-[#F3F3F3]"></div>
            <h2 className="text-[22px]">{"title"}</h2>
            <p>{"description"}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default MyLostItemsPage;
