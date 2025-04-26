import { useState, useEffect } from "react";

interface ServiceModalProps {
  onClose: () => void;
  onSubmit: (data: ServiceFormData) => void;
  initialData?: ServiceFormData;
}

interface ServiceFormData {
  id: number | undefined;
  name: string;
  description: string;
  price: string;
}

const ServiceModal = ({
  onClose,
  onSubmit,
  initialData,
}: ServiceModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const id = initialData?.id;

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ id, name, description, price });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto px-6 backdrop-blur-xl backdrop-brightness-40">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-indigo-950 text-2xl cursor-pointer"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-indigo-950 mb-6 text-center">
          {initialData ? "Edit Service" : "Add New Service"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Service Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-800"
              required
            />
          </div>

          <div className="mb-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Service Description"
              className="w-full p-3 border border-gray-300 rounded-md h-24 resize-none overflow-y-scroll focus:outline-none focus:ring-2 focus:ring-indigo-800"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price (e.g., Starting at $1000)"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-800"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 text-white bg-indigo-950 rounded-md cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
