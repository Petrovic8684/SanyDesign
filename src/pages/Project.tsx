import { useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Project = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const project = {
    title: "Project One",
    images: [
      "/assets/project/1.png",
      "/assets/project/2.png",
      "/assets/project/3.png",
    ],
    description:
      "This project is a creative exploration of modern design principles, focusing on user engagement and visual storytelling. The aim was to create a seamless experience that blends aesthetics with functionality.",
    tools: ["Figma", "Photoshop", "Illustrator"],
    liveUrl: "https://example.com",
  };

  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-rose-50 flex flex-col min-h-screen">
      <Navbar active="" />

      <main className="flex-1 flex flex-col items-center px-6 mt-14">
        <div className="max-w-4xl w-full flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-indigo-950 mb-8 md:mb-12">
            {project.title}
          </h1>

          <div className="relative w-full overflow-hidden mb-10">
            <img
              src={project.images[currentImage]}
              alt={project.title}
              className="object-cover w-70 h-full transition-all duration-300 mx-auto rounded-2xl shadow-lg"
            />

            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-indigo-950/80 hover:bg-indigo-950 text-white p-3 rounded-full shadow-lg"
            >
              <HiChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-indigo-950/80 hover:bg-indigo-950 text-white p-3 rounded-full shadow-lg"
            >
              <HiChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          <p className="text-lg text-indigo-950 mb-10">{project.description}</p>

          {project.tools.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {project.tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-indigo-950 text-rose-50 rounded-full text-sm font-semibold shadow-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="my-8 text-indigo-950 text-sm flex items-center space-x-1 hover:underline"
            >
              <span className="text-base md:text-lg">More details</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414L10 13.414 5.293 8.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Project;
