import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Project } from "../../lib/types";
import { TiEdit } from "react-icons/ti";
import { TiDelete } from "react-icons/ti";

interface Props {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}

const SortableProjectRow = ({ project, onEdit, onDelete }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: project.id!,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} className="border-b">
      <td
        {...attributes}
        {...listeners}
        className="p-3 cursor-grab text-xl text-gray-500"
      >
        &#9776;
      </td>
      <td className="p-3">
        {project.title.length > 20
          ? `${project.title.slice(0, 20)}...`
          : project.title}
      </td>
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
              className="w-12 h-12 object-cover rounded-md"
            />
          ))}
        </div>
      </td>
      <td className="p-3">
        {project.description.length > 20
          ? `${project.description.slice(0, 20)}...`
          : project.description}
      </td>
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
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            className="text-indigo-600 underline"
          >
            {project.liveUrl}
          </a>
        ) : (
          <p className="text-indigo-800 italic font-bold">NULL</p>
        )}
      </td>
      <td className="p-3 space-x-2">
        <button onClick={onEdit} className="text-yellow-600 cursor-pointer">
          <TiEdit size={25} />
        </button>
        <button onClick={onDelete} className="text-red-600 cursor-pointer">
          <TiDelete size={25} />
        </button>
      </td>
    </tr>
  );
};

export default SortableProjectRow;
