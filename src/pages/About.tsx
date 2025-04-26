import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { api } from "../lib/api";

interface Tool {
  id: number | undefined;
  name: string;
  emoji: string;
  url: string;
}

const About = () => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const result = await api.get(`/tools`);
      setTools(result.data);
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to get tools.");
    }
  };

  return (
    <div className="bg-rose-50 flex flex-col">
      <Navbar active="about" />

      <main className="flex-1 flex flex-col items-center justify-start px-6 mt-14">
        <div className="text-center mb-8 space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-indigo-950">
            Welcome to My World
          </h1>
          <p className="text-lg max-w-4xl mx-auto text-indigo-950">
            I believe design is more than just aesthetics – it's about solving
            problems, making connections, and creating experiences that leave an
            impact. I specialize in bringing ideas to life with a unique mix of
            creativity, strategic thinking, and cutting-edge design tools.
          </p>
        </div>

        <div className="relative flex justify-center items-center mb-14">
          <img
            src="/assets/about/sany.jpg"
            alt=""
            className="lg:w-1/2 md:w-2/3 w-full rounded-2xl shadow-lg"
          />
        </div>

        <div className="w-full px-6">
          <section className="w-full lg:w-3/5 py-12 px-6 md:px-12 bg-white text-center lg:text-left rounded-2xl shadow-md mb-10 lg:mr-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-indigo-950">
              My Creative Process
            </h2>
            <p className="mt-6 text-base md:text-lg text-indigo-950 max-w-3xl mx-auto">
              From brainstorming sessions to final designs, I take a hands-on,
              collaborative approach to every project. I believe that good
              design starts with a deep understanding of the client's needs,
              followed by creative exploration, and finishing with seamless
              execution.
            </p>
          </section>

          <section className="w-full lg:w-3/5 py-12 px-6 md:px-12 bg-white text-center lg:text-right rounded-2xl shadow-md mb-10 lg:ml-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-indigo-950">
              Tools I Work With
            </h2>
            <ul className="flex flex-wrap justify-center gap-8 mt-8 text-base md:text-lg text-indigo-950">
              {tools.map((tool) => (
                <li
                  key={tool.id}
                  className="hover:text-indigo-700 cursor-pointer"
                >
                  <Link to={tool.url} className="flex items-center gap-2">
                    <span>{tool.emoji}</span>
                    <span>{tool.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
