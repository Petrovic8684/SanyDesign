import { useState, useEffect } from "react";

interface ToolModalProps {
  onClose: () => void;
  onSubmit: (data: ToolFormData) => void;
  initialData?: ToolFormData;
}

interface ToolFormData {
  id: number | undefined;
  name: string;
  emoji: string;
  url: string;
}

const ToolModal = ({ onClose, onSubmit, initialData }: ToolModalProps) => {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const id = initialData?.id;

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmoji(initialData.emoji);
      setUrl(initialData.url);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ id, name, emoji, url });
    setLoading(false);
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
          {initialData ? "Edit Tool" : "Add New Tool"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tool Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-800"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              placeholder="Emoji (e.g. 🎨)"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-800"
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Tool URL"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-800"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 text-white bg-indigo-950 rounded-md ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ToolModal;
