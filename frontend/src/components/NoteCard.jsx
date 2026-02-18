import { PenSquareIcon, Trash2Icon, DownloadIcon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.log("Error in handleDelete function", error);
      toast.error("Failed to delete note");
    }
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const content = `${note.title}\n${"=".repeat(note.title.length)}\n\n${note.content}\n\nCreated: ${formatDate(new Date(note.createdAt))}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${note.title.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Note downloaded!");
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 transition-all duration-300 
      border-t-4 border-solid border-t-[#DE68AC]
      shadow-md hover:shadow-xl hover:-translate-y-1"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <button className="btn btn-ghost btn-xs" onClick={handleDownload}>
              <DownloadIcon className="size-4" />
            </button>
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;