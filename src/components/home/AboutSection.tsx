import Image from "next/image";
import loseAndFound from "../../../public/lose-and-found.png";
const AboutSection = () => {
  return (
    <section className="my-container mt-[140px]">
      <h2 className="text-2xl font-bold">About</h2>
      <div className="flex flex-col-reverse lg:grid grid-cols-3 mt-5">
        <div className="col-span-2  md:w-[80%]">
          <h3 className="text-2xl font-bold mt-4">Our Mission</h3>
          <p className="mt-3">
            Connecting lost items with their owners to bring peace of mind and
            happiness.
          </p>
          <h3 className="text-2xl font-bold mt-4">How It Works</h3>
          <p className="mt-3">
            Easily report lost or found items, and search our database to help
            reunite people with their belongings.
          </p>
          <h3 className="text-2xl font-bold mt-4">Our Values</h3>
          <p className="mt-3">
            Empathy, integrity, and collaboration are at the heart of everything
            we do.
          </p>
        </div>
        <Image
          className="bg-indigo-500/50 rounded-lg border"
          src={loseAndFound}
          alt="banner image"
        />
      </div>
    </section>
  );
};

export default AboutSection;
