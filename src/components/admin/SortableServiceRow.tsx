import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Service } from "../../lib/types";
import { TiEdit } from "react-icons/ti";
import { TiDelete } from "react-icons/ti";

interface Props {
  service: Service;
  onEdit: () => void;
  onDelete: () => void;
}

const SortableServiceRow = ({ service, onEdit, onDelete }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: service.id!,
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
      <td className="p-3">{service.name}</td>
      <td className="p-3">
        {service.description && service.description.length > 40
          ? `${service.description.slice(0, 40)}...`
          : service.description}
      </td>
      <td className="p-3">{service.price}</td>
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

export default SortableServiceRow;
