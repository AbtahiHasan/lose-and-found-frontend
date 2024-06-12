import {
  getMyFoundItems,
  getRecentPost,
} from "@/lib/actions/loseAndFount.action";
import Image from "next/image";
import loseAndFoundImg from "../../../../public/lose-and-found.png";

import { IoClose } from "react-icons/io5";
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
import { Input } from "@/components/ui/input";
import { config } from "@/config";
import ClaimForm from "@/components/shared/ClaimForm";
import { getUser } from "@/lib/actions/auth.action";

const RecentPostsPage = async () => {
  const res = await getRecentPost();
  const foundItemsRes = await getMyFoundItems();
  const user = await getUser();

  return (
    <main className="my-container">
      <h2 className="text-xl text-center font-bold mb-10 mt-20">
        Lost Items Recently Submitted
      </h2>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(res?.data) &&
          res?.data?.map((item: any, index: number) => (
            <article key={index}>
              <Drawer>
                <DrawerTrigger asChild>
                  <div className="cursor-pointer text-center p-3 rounded-lg border shadow backdrop-blur-md">
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

                    <div>
                      <p>Category: {item?.category}</p>
                      <p>Lose Date: {item?.date}</p>
                    </div>
                    <hr />
                    <p className="text-base">
                      {item?.description?.length > 40
                        ? item?.description?.slice(0, 40) + "..."
                        : item?.description}
                    </p>
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full my-container">
                    <DrawerHeader>
                      <DrawerTitle>Description</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <div className="space-x-2">{item?.description}</div>
                    </div>
                    <DrawerFooter>
                      <hr />
                      contact: {item?.email}
                      <ClaimForm id={item?._id} user={user} />
                      <DrawerClose asChild>
                        <Button
                          className="text-2xl mx-auto w-[40px] h-[40px]  border border-red-600 rounded-full p-2 text-red-600"
                          variant="no"
                        >
                          <IoClose className="" />
                        </Button>
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
          foundItemsRes?.data?.map((item: any, index: number) => (
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
