import { useState } from "react";
import { SparklesIcon } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const ACTIONS = [
  { key: "improve", label: "✨ Improve" },
  { key: "grammar", label: " Fix Grammar" },
  { key: "expand", label: " Expand" },
  { key: "summarize", label: "Summarize" },
];

const AiToolbar = ({ content, onAccept }) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [activeAction, setActiveAction] = useState(null);

  const handleAction = async (action) => {
    if (!content.trim()) {
      toast.error("Write some content first!");
      return;
    }
    setLoading(true);
    setActiveAction(action);
    setSuggestion("");
    try {
      const res = await api.post("/ai/improve", { content, action });
      setSuggestion(res.data.result);
    } catch (error) {
      toast.error("AI request failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    onAccept(suggestion);
    setSuggestion("");
    setActiveAction(null);
    toast.success("Content updated!");
  };

  const handleDiscard = () => {
    setSuggestion("");
    setActiveAction(null);
  };

  return (
    <div className="mt-2">
      
      <div className="flex flex-wrap gap-2 mb-2">
        {ACTIONS.map((a) => (
          <button
            key={a.key}
            type="button"
            className={`btn btn-xs btn-outline btn-primary ${activeAction === a.key && loading ? "loading" : ""}`}
            onClick={() => handleAction(a.key)}
            disabled={loading}
          >
            {activeAction === a.key && loading ? "Thinking..." : a.label}
          </button>
        ))}
      </div>

      
      {suggestion && (
        <div className="bg-base-200 border border-primary/30 rounded-lg p-3 mt-2">
          <div className="flex items-center gap-1 text-primary text-xs font-semibold mb-2">
            <SparklesIcon className="size-3" />
            AI Suggestion
          </div>
          <p className="text-sm whitespace-pre-wrap text-base-content">{suggestion}</p>
          <div className="flex gap-2 mt-3">
            <button type="button" className="btn btn-xs btn-primary" onClick={handleAccept}>
              ✅ Accept
            </button>
            <button type="button" className="btn btn-xs btn-ghost" onClick={handleDiscard}>
              ❌ Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiToolbar;