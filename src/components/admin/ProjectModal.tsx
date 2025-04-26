import { useState, useEffect } from "react";

interface ProjectModalProps {
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
  initialData?: ProjectFormData;
  toolsList: string[];
}

interface ProjectFormData {
  coverImg: string;
  title: string;
  images: string[];
  description: string;
  tools: string[];
  liveUrl: string;
}

const ProjectModal = ({
  onClose,
  onSubmit,
  initialData,
  toolsList,
}: ProjectModalProps) => {
  const [coverImg, setCoverImg] = useState<string>("");
  //const [coverFile, setCoverFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  //const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [description, setDescription] = useState<string>("");
  const [tools, setTools] = useState<string[]>([]);
  const [liveUrl, setLiveUrl] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setCoverImg(initialData.coverImg);
      setTitle(initialData.title);
      setImages(initialData.images);
      setDescription(initialData.description);
      setTools(initialData.tools);
      setLiveUrl(initialData.liveUrl);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      coverImg,
      title,
      images,
      description,
      tools,
      liveUrl,
    });

    onClose();
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      //setCoverFile(file);
      setCoverImg(URL.createObjectURL(file));
    }
  };

  const handleImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      //setImageFiles(fileArray);
      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setImages(urls);
    }
  };

  const handleToolSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const updatedTools = [...tools];
    updatedTools[index] = e.target.value;
    setTools(updatedTools);
  };

  const handleAddTool = () => {
    setTools([...tools, toolsList[0] || ""]);
  };

  const handleRemoveTool = (index: number) => {
    const updatedTools = [...tools];
    updatedTools.splice(index, 1);
    setTools(updatedTools);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto px-6 backdrop-blur-xl backdrop-brightness-40">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-indigo-950 text-2xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-indigo-950 mb-6 text-center">
          {initialData ? "Edit Project" : "Add New Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project Title"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block mb-2 font-semibold">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverFileChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {coverImg && (
              <img
                src={coverImg}
                alt="Cover Preview"
                className="w-full h-40 object-cover rounded-md mt-2"
              />
            )}
          </div>

          {/* Images */}
          <div>
            <label className="block mb-2 font-semibold">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageFilesChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-md"
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project Description"
              className="w-full p-3 border border-gray-300 rounded-md resize-none overflow-y-scroll"
              rows={4}
              required
            />
          </div>

          {/* Tools */}
          <div>
            <label className="block mb-2 font-semibold">Tools</label>
            {tools.map((tool, index) => (
              <div key={index} className="flex items-center mb-2">
                <select
                  value={tool}
                  onChange={(e) => handleToolSelect(e, index)}
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                >
                  {toolsList.map((toolOption, idx) => (
                    <option key={idx} value={toolOption}>
                      {toolOption}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleRemoveTool(index)}
                  className="ml-2 text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTool}
              className="text-indigo-600 mt-2"
            >
              + Add Tool
            </button>
          </div>

          {/* Live URL */}
          <div>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="Live Project URL"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 text-white bg-indigo-950 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
