import { useEffect, useState } from "react";
import ProjectModal from "../components/admin/ProjectModal";
import ToolModal from "../components/admin/ToolModal";
import ServiceModal from "../components/admin/ServiceModal";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { BeatLoader } from "react-spinners";
import { Project, Tool, Service } from "../lib/types";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableProjectRow from "../components/admin/SortableProjectRow";
import SortableToolRow from "../components/admin/SortableToolRow";
import SortableServiceRow from "../components/admin/SortableServiceRow";

const AdminPanel = () => {
  const [projects, setProjects] = useState<Project[]>();
  const [tools, setTools] = useState<Tool[]>();
  const [services, setServices] = useState<Service[]>();
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showToolModal, setShowToolModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentTool, setCurrentTool] = useState<Tool | null>(null);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

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
    navigate("/");
  };

  const handleAddProject = async (data: Project) => {
    if (!projects) return;

    if (data.liveUrl === "") data.liveUrl = null;
    try {
      const response = await api.post("/projects", data);
      setProjects([response.data, ...projects]);
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to add project.");
    }
  };

  const handleEditProject = async (data: Project) => {
    if (!projects) return;
    if (!currentProject || currentProject.id === undefined) return;

    if (data.liveUrl === "") data.liveUrl = null;

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
    if (!projects) return;
    if (id === undefined) return;

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!isConfirmed) return;

    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to delete project.");
    }
  };

  const handleAddTool = async (data: Tool) => {
    if (!tools) return;

    try {
      const response = await api.post("/tools", data);
      setTools([response.data, ...tools]);
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to add tool.");
    }
  };

  const handleEditTool = async (data: Tool) => {
    if (!tools) return;
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
    if (!tools) return;

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this tool?"
    );
    if (!isConfirmed) return;

    try {
      await api.delete(`/tools/${id}`);
      setTools(tools.filter((tool) => tool.id !== id));
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to delete tool.");
    }
  };

  const handleAddService = async (data: Service) => {
    if (!services) return;

    try {
      const response = await api.post("/services", data);
      setServices([response.data, ...services]);
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to add service.");
    }
  };

  const handleEditService = async (data: Service) => {
    if (!services) return;
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
    if (!services) return;
    if (id === undefined) return;

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (!isConfirmed) return;

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

          {projects ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={({ active, over }) => {
                  if (!active || !over || active.id === over.id || !projects)
                    return;

                  const oldIndex = projects.findIndex(
                    (p) => p.id === active.id
                  );
                  const newIndex = projects.findIndex((p) => p.id === over.id);
                  const newOrder = arrayMove(projects, oldIndex, newIndex);

                  setProjects(newOrder);

                  newOrder.forEach((project, index) => {
                    api.patch(`/projects/${project.id}`, {
                      orderNo: newOrder.length - index,
                    });
                  });
                }}
              >
                <SortableContext
                  items={projects.map((p) => p.id!)}
                  strategy={verticalListSortingStrategy}
                >
                  <table className="w-max lg:min-w-full table-auto">
                    <thead className="bg-indigo-950 text-white">
                      <tr>
                        <th className="p-3 text-left w-10"> </th>
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
                      {projects.map((project) => (
                        <SortableProjectRow
                          key={project.id}
                          project={project}
                          onEdit={() => {
                            setCurrentProject(project);
                            setShowProjectModal(true);
                          }}
                          onDelete={() => handleDeleteProject(project.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </SortableContext>
              </DndContext>
            </div>
          ) : (
            <BeatLoader color="#1E1A4D" margin={10} />
          )}

          {projects && (
            <button
              onClick={() => {
                setCurrentProject(null);
                setShowProjectModal(true);
              }}
              className="bg-indigo-950 text-white py-2 px-4 rounded-md mt-6 cursor-pointer"
            >
              Add Project
            </button>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-950 mb-4">Tools</h2>

          {tools ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={({ active, over }) => {
                  if (!active || !over || active.id === over.id || !tools)
                    return;

                  const oldIndex = tools.findIndex((t) => t.id === active.id);
                  const newIndex = tools.findIndex((t) => t.id === over.id);
                  const newOrder = arrayMove(tools, oldIndex, newIndex);

                  setTools(newOrder);

                  newOrder.forEach((tool, index) => {
                    api.patch(`/tools/${tool.id}`, {
                      orderNo: newOrder.length - index,
                    });
                  });
                }}
              >
                <SortableContext
                  items={tools.map((t) => t.id!)}
                  strategy={verticalListSortingStrategy}
                >
                  <table className="w-max md:min-w-full table-auto">
                    <thead className="bg-indigo-950 text-white">
                      <tr>
                        <th className="p-3 text-left w-10"> </th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Emoji</th>
                        <th className="p-3 text-left">URL</th>
                        <th className="p-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tools.map((tool) => (
                        <SortableToolRow
                          key={tool.id}
                          tool={tool}
                          onEdit={() => {
                            setCurrentTool(tool);
                            setShowToolModal(true);
                          }}
                          onDelete={() => handleDeleteTool(tool.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </SortableContext>
              </DndContext>
            </div>
          ) : (
            <BeatLoader color="#1E1A4D" margin={10} />
          )}

          {tools && (
            <button
              onClick={() => {
                setCurrentTool(null);
                setShowToolModal(true);
              }}
              className="bg-indigo-950 text-white py-2 px-4 rounded-md mt-6 cursor-pointer"
            >
              Add Tool
            </button>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-indigo-950 mb-4">
            Services
          </h2>

          {services ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={({ active, over }) => {
                  if (!active || !over || active.id === over.id || !services)
                    return;

                  const oldIndex = services.findIndex(
                    (s) => s.id === active.id
                  );
                  const newIndex = services.findIndex((s) => s.id === over.id);
                  const newOrder = arrayMove(services, oldIndex, newIndex);

                  setServices(newOrder);

                  newOrder.forEach((service, index) => {
                    api.patch(`/services/${service.id}`, {
                      orderNo: newOrder.length - index,
                    });
                  });
                }}
              >
                <SortableContext
                  items={services.map((s) => s.id!)}
                  strategy={verticalListSortingStrategy}
                >
                  <table className="w-max md:min-w-full table-auto">
                    <thead className="bg-indigo-950 text-white">
                      <tr>
                        <th className="p-3 text-left"> </th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Description</th>
                        <th className="p-3 text-left">Price</th>
                        <th className="p-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <SortableServiceRow
                          key={service.id}
                          service={service}
                          onEdit={() => {
                            setCurrentService(service);
                            setShowServiceModal(true);
                          }}
                          onDelete={() => handleDeleteService(service.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </SortableContext>
              </DndContext>
            </div>
          ) : (
            <BeatLoader color="#1E1A4D" margin={10} />
          )}

          {services && (
            <button
              onClick={() => {
                setCurrentService(null);
                setShowServiceModal(true);
              }}
              className="bg-indigo-950 text-white py-2 px-4 rounded-md mt-6 cursor-pointer"
            >
              Add Service
            </button>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="text-indigo-800 cursor-pointer mt-12 ml-1"
        >
          LOGOUT
        </button>

        {showProjectModal && tools && (
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
