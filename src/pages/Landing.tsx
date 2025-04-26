import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

const Landing = () => {
  const dummyProjects = [
    {
      id: 1,
      coverImg: "/assets/landing/2.png",
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
    },
    {
      id: 2,
      coverImg: "/assets/landing/3.png",
      title: "Project Two",
      images: [
        "/assets/project/1.png",
        "/assets/project/2.png",
        "/assets/project/3.png",
      ],
      description:
        "This project is a creative exploration of modern design principles, focusing on user engagement and visual storytelling. The aim was to create a seamless experience that blends aesthetics with functionality.",
      tools: ["Figma", "Photoshop", "Illustrator"],
      liveUrl: "https://example.com",
    },
    {
      id: 3,
      coverImg: "/assets/landing/4.png",
      title: "Project Three",
      images: [
        "/assets/project/1.png",
        "/assets/project/2.png",
        "/assets/project/3.png",
      ],
      description:
        "This project is a creative exploration of modern design principles, focusing on user engagement and visual storytelling. The aim was to create a seamless experience that blends aesthetics with functionality.",
      tools: ["Figma", "Photoshop", "Illustrator"],
      liveUrl: "https://example.com",
    },
  ];

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
              src="/assets/landing/sany.jpg"
              alt=""
              className="w-40 lg:w-48 rounded-2xl shadow-lg"
            />
          </div>
        </div>

        <a
          href="#work"
          className="my-8 text-indigo-950 text-sm flex items-center space-x-1 hover:underline"
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

      <section
        id="work"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pt-24 pb-6"
      >
        {dummyProjects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            coverImg={project.coverImg}
            title={project.title}
          />
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
