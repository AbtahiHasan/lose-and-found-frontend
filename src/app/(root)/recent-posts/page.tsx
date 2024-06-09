import {
  getMyFoundItems,
  getRecentPost,
} from "@/lib/actions/loseAndFount.action";
import Image from "next/image";
import loseAndFoundImg from "../../../../public/lose-and-found.png";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const RecentPostsPage = async () => {
  const res = await getRecentPost();
  const foundItemsRes = await getMyFoundItems();

  return (
    <main className="my-container">
      <h2 className="text-xl text-center font-bold mb-10 mt-20">
        Lost Items Recently Submitted
      </h2>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(res?.data) &&
          res?.data.map((item: any, index: number) => (
            <article
              className="text-center p-3 rounded-lg border shadow backdrop-blur-md"
              key={index}
            >
              <Image
                className="w-full h-[200px] rounded-lg bg-[#F3F3F3]"
                src={
                  item?.image?.startsWith("https")
                    ? item?.image
                    : loseAndFoundImg
                }
                width={200}
                height={200}
                alt={"image"}
              />

              <p>Category: {item?.category}</p>
              <p>Lose Date: {item?.date}</p>
              <hr />
              <p className="text-base">
                {item?.description?.length > 50
                  ? item?.description?.slice(0, 50) + "..."
                  : item?.description}
              </p>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className="flex flex-col items-center" variant="no">
                    {item?.description?.length > 50 && (
                      <p className="text-sky-500">Click to read more</p>
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full my-container">
                    <DrawerHeader>
                      <DrawerTitle>Description</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <div className="flex items-center justify-center space-x-2">
                        {item?.description}
                      </div>
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </article>
          ))}
      </section>
      <h2 className="text-xl text-center font-bold mb-10 mt-20">
        Found Items Recently Submitted
      </h2>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(res?.data) &&
          foundItemsRes?.data.map((item: any, index: number) => (
            <article
              className="text-center p-3 rounded-lg border shadow backdrop-blur-md"
              key={index}
            >
              <Image
                className="w-full h-[200px] rounded-lg bg-[#F3F3F3]"
                src={
                  item?.image?.startsWith("https")
                    ? item?.image
                    : loseAndFoundImg
                }
                width={200}
                height={200}
                alt={"image"}
              />

              <p>Category: {item?.category}</p>
              <p>Lose Date: {item?.date}</p>
              <hr />
              <p className="text-base">
                {item?.description?.length > 50
                  ? item?.description?.slice(0, 50) + "..."
                  : item?.description}
              </p>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className="flex flex-col items-center" variant="no">
                    {item?.description?.length > 50 && (
                      <p className="text-sky-500">Click to read more</p>
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full my-container">
                    <DrawerHeader>
                      <DrawerTitle>Description</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <div className="flex items-center justify-center space-x-2">
                        {item?.description}
                      </div>
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </article>
          ))}
      </section>
    </main>
  );
};

export default RecentPostsPage;
