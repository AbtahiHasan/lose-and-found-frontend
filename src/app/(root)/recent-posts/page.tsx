import { getRecentPost } from "@/lib/actions/loseAndFount.action";
import Image from "next/image";

const RecentPostsPage = async () => {
  const res = await getRecentPost();
  console.log({ data: res?.data });
  return (
    <main className="my-container">
      <h1 className="text-2xl text-center font-bold mb-10 mt-20">
        Lost Items Recently Submitted
      </h1>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(res?.data) &&
          res?.data.map((item: any, index: number) => (
            <article
              className="text-center p-3 rounded-lg border shadow backdrop-blur-md"
              key={index}
            >
              {/* <Image src={"/"} alt={"image"} /> */}
              <div className="w-full h-[200px] rounded-lg bg-[#F3F3F3]"></div>
              <h2 className="text-[22px] mt-2 font-bold">
                {item?.foundItemName}
              </h2>
              <p>
                {item?.description?.length > 100
                  ? item?.description?.slice(0, 100) + "..."
                  : item?.description}
              </p>
            </article>
          ))}
      </section>
    </main>
  );
};

export default RecentPostsPage;
