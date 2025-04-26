import { useEffect, useState } from "react";
import ProjectModal from "../components/admin/ProjectModal";
import ToolModal from "../components/admin/ToolModal";
import ServiceModal from "../components/admin/ServiceModal";

const dummyProjects = [
  {
    id: 1,
    coverImg: "/assets/landing/2.png",
    title: "Project One",
    images: ["/assets/project/1.png", "/assets/project/2.png"],
    description: "Short project description here.",
    tools: ["Figma", "Photoshop", "Illustrator"],
    liveUrl: "https://example.com",
  },
  {
    id: 2,
    coverImg: "/assets/landing/3.png",
    title: "Project Two",
    images: ["/assets/project/1.png", "/assets/project/2.png"],
    description: "Another project description here.",
    tools: ["Figma", "Photoshop", "Illustrator"],
    liveUrl: "https://example.com",
  },
];

const dummyTools = [
  {
    name: "Illustrator",
    emoji: "🖌️",
    url: "https://www.adobe.com/products/illustrator.html",
  },
  {
    name: "Photoshop",
    emoji: "📸",
    url: "https://www.adobe.com/products/photoshop.html",
  },
  { name: "Figma", emoji: "🎨", url: "https://www.figma.com/" },
];

const dummyServices = [
  {
    name: "Branding",
    description:
      "Helping businesses build their identity, from logos to brand guidelines.",
    price: "Starting at $1000",
  },
  {
    name: "Web Design",
    description:
      "Crafting user-friendly and visually appealing websites tailored to your needs.",
    price: "Starting at $1500",
  },
];

interface Project {
  coverImg: string;
  title: string;
  images: string[];
  description: string;
  tools: string[];
  liveUrl: string;
}

interface Tool {
  name: string;
  emoji: string;
  url: string;
}

interface Service {
  name: string;
  description: string;
  price: string;
}

const AdminPanel = () => {
  const [projects, setProjects] = useState<Project[]>(dummyProjects);
  const [tools, setTools] = useState<Tool[]>(dummyTools);
  const [services, setServices] = useState<Service[]>(dummyServices);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showToolModal, setShowToolModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentTool, setCurrentTool] = useState<Tool | null>(null);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  useEffect(() => {
    if (showProjectModal || showToolModal || showServiceModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showProjectModal, showToolModal, showServiceModal]);

  const handleAddProject = (data: Project) => {
    setProjects([...projects, data]);
  };

  const handleEditProject = (data: Project) => {
    const updatedProjects = projects.map((project) =>
      project.title === currentProject?.title ? data : project
    );
    setProjects(updatedProjects);
  };

  const handleDeleteProject = (title: string) => {
    setProjects(projects.filter((project) => project.title !== title));
  };

  const handleAddTool = (data: Tool) => {
    setTools([...tools, data]);
  };

  const handleEditTool = (data: Tool) => {
    const updatedTools = tools.map((tool) =>
      tool.name === currentTool?.name ? data : tool
    );
    setTools(updatedTools);
  };

  const handleDeleteTool = (name: string) => {
    setTools(tools.filter((tool) => tool.name !== name));
  };

  const handleAddService = (data: Service) => {
    setServices([...services, data]);
  };

  const handleEditService = (data: Service) => {
    const updatedServices = services.map((service) =>
      service.name === currentService?.name ? data : service
    );
    setServices(updatedServices);
  };

  const handleDeleteService = (name: string) => {
    setServices(services.filter((service) => service.name !== name));
  };

  return (
    <div className="p-6 bg-rose-50 min-h-screen">
      <div className="my-12">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-indigo-950 mb-4">
            Projects
          </h2>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-max lg:min-w-full table-auto">
              <thead className="bg-indigo-950 text-white">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Cover</th>
                  <th className="p-3 text-left">Images</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Tools</th>
                  <th className="p-3 text-left">Live URL</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{project.title}</td>
                    <td className="p-3">
                      <img
                        src={project.coverImg}
                        alt={project.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        {project.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Img ${idx + 1}`}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    </td>
                    <td className="p-3">{project.description}</td>
                    <td className="p-3">
                      {project.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs mr-2"
                        >
                          {tool}
                        </span>
                      ))}
                    </td>
                    <td className="p-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 underline"
                      >
                        {project.liveUrl}
                      </a>
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => {
                          setCurrentProject(project);
                          setShowProjectModal(true);
                        }}
                        className="text-indigo-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.title)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => {
              setCurrentProject(null);
              setShowProjectModal(true);
            }}
            className="bg-indigo-950 text-white py-2 px-4 rounded-md mt-6"
          >
            Add Project
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-950 mb-4">Tools</h2>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-max md:min-w-full table-auto">
              <thead className="bg-indigo-950 text-white">
                <tr>
                  <th className="p-3 text-left">Emoji</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">URL</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 text-2xl">{tool.emoji}</td>
                    <td className="p-3">{tool.name}</td>
                    <td className="p-3">
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 underline"
                      >
                        {tool.url}
                      </a>
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => {
                          setCurrentTool(tool);
                          setShowToolModal(true);
                        }}
                        className="text-indigo-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTool(tool.name)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => {
              setCurrentTool(null);
              setShowToolModal(true);
            }}
            className="bg-indigo-950 text-white py-2 px-4 rounded-md mt-6"
          >
            Add Tool
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-950 mb-4">
            Services
          </h2>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-max md:min-w-full table-auto">
              <thead className="bg-indigo-950 text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{service.name}</td>
                    <td className="p-3">{service.description}</td>
                    <td className="p-3">{service.price}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => {
                          setCurrentService(service);
                          setShowServiceModal(true);
                        }}
                        className="text-indigo-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.name)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => {
              setCurrentService(null);
              setShowServiceModal(true);
            }}
            className="bg-indigo-950 text-white py-2 px-4 rounded-md mt-6"
          >
            Add Service
          </button>
        </div>

        {showProjectModal && (
          <ProjectModal
            onClose={() => {
              setShowProjectModal(false);
              setCurrentProject(null);
            }}
            onSubmit={currentProject ? handleEditProject : handleAddProject}
            initialData={currentProject || undefined}
            toolsList={tools.map((tool) => tool.name)}
          />
        )}

        {showToolModal && (
          <ToolModal
            onClose={() => {
              setShowToolModal(false);
              setCurrentTool(null);
            }}
            onSubmit={currentTool ? handleEditTool : handleAddTool}
            initialData={currentTool || undefined}
          />
        )}

        {showServiceModal && (
          <ServiceModal
            onClose={() => {
              setShowServiceModal(false);
              setCurrentService(null);
            }}
            onSubmit={currentService ? handleEditService : handleAddService}
            initialData={currentService || undefined}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
