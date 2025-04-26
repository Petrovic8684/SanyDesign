import { Link } from "react-router-dom";

type ProjectCardProps = {
  id: number;
  coverImg: string;
  title: string;
};

const ProjectCard = ({ id, coverImg, title }: ProjectCardProps) => {
  return (
    <Link
      to={`/projects/${id}`}
      className="relative group overflow-hidden rounded-md"
    >
      <img
        src={coverImg}
        alt={title}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-indigo-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-rose-50 text-lg font-semibold px-4 text-center">
          {title}
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
