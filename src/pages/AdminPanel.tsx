import { useEffect, useState } from "react";
import ProjectModal from "../components/admin/ProjectModal";
import ToolModal from "../components/admin/ToolModal";
import ServiceModal from "../components/admin/ServiceModal";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

interface Project {
  id: number | undefined;
  coverImg: string;
  title: string;
  images: string[];
  description: string;
  tools: string[];
  liveUrl: string;
}

interface Tool {
  id: number | undefined;
  name: string;
  emoji: string;
  url: string;
}

interface Service {
  id: number | undefined;
  name: string;
  description: string;
  price: string;
}

const AdminPanel = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showToolModal, setShowToolModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentTool, setCurrentTool] = useState<Tool | null>(null);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

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

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [projectsResponse, toolsResponse, servicesResponse] =
        await Promise.all([
          api.get("/projects"),
          api.get("/tools"),
          api.get("/services"),
        ]);

      setProjects(projectsResponse.data);
      setTools(toolsResponse.data);
      setServices(servicesResponse.data);
    } catch (err: any) {
      if (err.response) {
        console.error(
          err.response.data.message || "An error occurred while fetching data."
        );
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddProject = async (data: Project) => {
    try {
      const response = await api.post("/projects", data);
      setProjects([...projects, response.data]);
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to add project.");
    }
  };

  const handleEditProject = async (data: Project) => {
    if (!currentProject || currentProject.id === undefined) return;

    try {
      const response = await api.patch(`/projects/${currentProject.id}`, data);
      const updatedProjects = projects.map((project) =>
        project.id === currentProject.id ? response.data : project
      );
      setProjects(updatedProjects);
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to edit project.");
    }
  };

  const handleDeleteProject = async (id: number | undefined) => {
    if (id === undefined) return;

    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to delete project.");
    }
  };

  const handleAddTool = async (data: Tool) => {
    try {
      const response = await api.post("/tools", data);
      setTools([...tools, response.data]);
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to add tool.");
    }
  };

  const handleEditTool = async (data: Tool) => {
    if (!currentTool) return;

    try {
      const response = await api.patch(`/tools/${currentTool.id}`, data);
      const updatedTools = tools.map((tool) =>
        tool.id === currentTool.id ? response.data : tool
      );
      setTools(updatedTools);
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to edit tool.");
    }
  };

  const handleDeleteTool = async (id: number | undefined) => {
    try {
      await api.delete(`/tools/${id}`);
      setTools(tools.filter((tool) => tool.id !== id));
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to delete tool.");
    }
  };

  const handleAddService = async (data: Service) => {
    try {
      const response = await api.post("/services", data);
      setServices([...services, response.data]);
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to add service.");
    }
  };

  const handleEditService = async (data: Service) => {
    if (!currentService) return;

    try {
      const response = await api.patch(`/services/${currentService.id}`, data);
      const updatedServices = services.map((service) =>
        service.id === currentService.id ? response.data : service
      );
      setServices(updatedServices);
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to edit service.");
    }
  };

  const handleDeleteService = async (id: number | undefined) => {
    if (id === undefined) return;

    try {
      await api.delete(`/services/${id}`);
      setServices(services.filter((service) => service.id !== id));
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to delete service.");
    }
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
                        className="text-indigo-600 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600 cursor-pointer"
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
            className="bg-indigo-950 text-white py-2 px-4 rounded-md mt-6 cursor-pointer"
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
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Emoji</th>
                  <th className="p-3 text-left">URL</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{tool.name}</td>
                    <td className="p-3 text-2xl">{tool.emoji}</td>
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
                        className="text-indigo-600 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTool(tool.id)}
                        className="text-red-600 cursor-pointer"
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
            className="bg-indigo-950 text-white py-2 px-4 rounded-md mt-6 cursor-pointer"
          >
            Add Tool
          </button>
        </div>

        <div className="mb-4">
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
                        className="text-indigo-600 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-600 cursor-pointer"
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
            className="bg-indigo-950 text-white py-2 px-4 rounded-md mt-6 cursor-pointer"
          >
            Add Service
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="text-indigo-800 cursor-pointer mt-12 ml-1"
        >
          LOGOUT
        </button>

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
