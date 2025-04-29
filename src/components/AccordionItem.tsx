import { useState } from "react";

const AccordionItem = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between text-left group"
      >
        <span className="text-indigo-950 text-lg font-semibold">{title}</span>
        <span
          className={`text-indigo-950 text-xl transform transition-transform duration-300 cursor-pointer ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`px-6 pt-0 pb-5 text-indigo-950 text-sm leading-relaxed transition-all duration-300 ${
          open ? "block" : "hidden"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default AccordionItem;
