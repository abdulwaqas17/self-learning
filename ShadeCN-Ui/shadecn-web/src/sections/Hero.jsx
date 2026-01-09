import { Search } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="container px-4 py-10 mx-auto lg:h-128 lg:flex lg:items-center lg:space-x-8">
      
      {/* LEFT CONTENT */}
      <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
        <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
          A <span className="font-semibold">free repository</span> for community
          <br className="hidden lg:block" />
          components using{" "}
          <span className="font-semibold underline decoration-primary">
            Tailwind CSS
          </span>
        </h1>

        <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
          Open source Tailwind UI components and templates to
          <br className="hidden lg:block" />
          bootstrap your new apps, projects or landing sites!
        </p>

        {/* SEARCH BOX */}
        <div className="mt-6 bg-transparent border rounded-lg dark:border-gray-700 lg:w-2/3 focus-within:border-primary focus-within:ring focus-within:ring-primary focus-within:ring-opacity-20">
          <form
            action="https://www.creative-tim.com/twcomponents/search"
            className="flex flex-wrap justify-between md:flex-row"
          >
            <input
              type="search"
              name="query"
              placeholder="Search Components"
              required
              className="flex-1 h-10 px-4 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none lg:h-12 dark:text-gray-200 focus:outline-none focus:ring-0 focus:placeholder-transparent"
            />

             <button
              type="submit"
              className="flex items-center justify-center w-full p-2 m-1 text-white font-bold transition duration-300 rounded-lg lg:w-12 lg:h-12 bg-violet-800 focus:outline-none"
            >
                <Search className="w-5 h-5 font-bold" />
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
        <Image
          src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
          alt="tailwind css components"
          width={400}
          height={400}
          className="w-full h-full max-w-md mx-auto"
        />
      </div>
    </section>
  );
}
