import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Tool } from "../../lib/types";
import { TiEdit } from "react-icons/ti";
import { TiDelete } from "react-icons/ti";

interface Props {
  tool: Tool;
  onEdit: () => void;
  onDelete: () => void;
}

const SortableToolRow = ({ tool, onEdit, onDelete }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: tool.id!,
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

export default SortableToolRow;
