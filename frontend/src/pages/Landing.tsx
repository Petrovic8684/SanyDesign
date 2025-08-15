import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import { api } from "../lib/api";
import { GridLoader } from "react-spinners";
import { Project } from "../lib/types";

const Landing = () => {
  const [projects, setProjects] = useState<Project[]>();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const result = await api.get(`/projects`);
      setProjects(result.data);
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to get projects.");
    }
  };

  return (
    <div className="bg-rose-50 flex flex-col">
      <Navbar active="work" />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 mt-14">
        <div className="flex flex-col lg:flex-row items-center gap-x-10 gap-y-6 mb-6 lg:mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-indigo-950 text-center lg:text-left">
            Hey! I am Sanela Petković, <br className="hidden md:block" /> a
            graphic designer based in Belgrade.
          </h1>

          <div className="relative flex justify-center items-center">
            <img
              src={`https://res.cloudinary.com/${
                import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
              }/image/upload/f_auto,q_auto/v1/${
                import.meta.env.VITE_CLOUDINARY_FOLDER
              }/fwsi83qfjhbb5u0s9ref`}
              alt="Sanela Petković"
              className="w-40 lg:w-48 rounded-2xl shadow-lg"
            />
          </div>
        </div>

        <a
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("work")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="my-8 text-indigo-950 text-sm flex items-center space-x-1 hover:underline cursor-pointer"
        >
          <span className="text-base md:text-lg">Check out my work</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414L10 13.414 5.293 8.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </main>

      {projects ? (
        <section
          id="work"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pt-24 pb-6"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              coverImg={project.coverImg}
              title={project.title}
            />
          ))}
        </section>
      ) : (
        <GridLoader
          size={35}
          color="#1E1A4D"
          margin={20}
          className="mx-auto my-15"
        />
      )}

      <Footer />
    </div>
  );
};

export default Landing;
