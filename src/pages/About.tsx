import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Tool } from "../lib/types";
import Button from "../components/Button";
import { FaUserGraduate } from "react-icons/fa";

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

  const handleDownload = () => {
    window.open(import.meta.env.VITE_CV_LINK, "_blank");
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

        <div className="relative flex justify-center items-center mb-4">
          <img
            src={`https://res.cloudinary.com/${
              import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/image/upload/f_auto,q_auto/v1/${
              import.meta.env.VITE_CLOUDINARY_FOLDER
            }/trw4psd4hr6wfpdr5fzv`}
            alt=""
            className="lg:w-1/2 md:w-2/3 w-full rounded-2xl shadow-lg"
          />
        </div>
        <a
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("tools")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-8 mb-4 text-indigo-950 text-sm flex items-center space-x-1 hover:underline cursor-pointer"
        >
          <span className="text-base md:text-lg">What Powers My Work</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414L10 13.414 5.293 8.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>

        <section className="min-w-screen bg-indigo-950 text-white py-12 px-6 mb-12 mt-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-semibold italic">
              My Creative Process
            </h2>
            <p className="text-lg text-indigo-100 mb-8">
              From brainstorming sessions to final designs, I take a hands-on,
              collaborative approach to every project. I believe that good
              design starts with a deep understanding of the client's needs,
              followed by creative exploration, and finishing with seamless
              execution.
            </p>
            <Button
              text={"Download CV"}
              colors={
                "text-indigo-950 bg-rose-50 hover:bg-indigo-50 font-semibold"
              }
              action={handleDownload}
              icon={<FaUserGraduate />}
            />
          </div>
        </section>

        <section
          className="min-w-screen bg-rose-50 text-white py-12 px-6 mb-12"
          id="tools"
        >
          <div className="max-w-3xl mx-auto text-center space-y-6 text-indigo-950">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Tools I Work With
            </h2>
            <p className="text-lg">
              These are some of the powerful tools that I use to bring your
              ideas to life.
            </p>
          </div>

          <div className="flex justify-center gap-8 mt-10 flex-wrap">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-2xl shadow-lg p-6 w-40 flex flex-col items-center text-indigo-950 hover:bg-indigo-100 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <span className="text-4xl">{tool.emoji}</span>
                  <span className="mt-4 text-lg font-medium text-center">
                    {tool.name}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
