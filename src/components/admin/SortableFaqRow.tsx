import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Faq } from "../../lib/types";
import { TiEdit } from "react-icons/ti";
import { TiDelete } from "react-icons/ti";

interface Props {
  faq: Faq;
  onEdit: () => void;
  onDelete: () => void;
}

const SortableFaqRow = ({ faq, onEdit, onDelete }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: faq.id!,
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
        {faq.question.length > 40
          ? `${faq.question.slice(0, 40)}...`
          : faq.question}
      </td>
      <td className="p-3">
        {faq.answer.length > 40 ? `${faq.answer.slice(0, 40)}...` : faq.answer}
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

export default SortableFaqRow;
