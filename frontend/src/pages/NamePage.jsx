import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const NamePage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter your name");
    localStorage.setItem("username", name.trim());
    toast.success(`Welcome, ${name.trim()}!`);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body items-center text-center gap-4">
          <h1 className="text-4xl font-bold font-mono text-primary tracking-tight">ThinkBoard</h1>
          <p className="text-base-content/50 text-sm">Your personal note space</p>

          <form onSubmit={handleContinue} className="flex flex-col gap-4 w-full mt-4">
            <input
              type="text"
              placeholder="What's your name?"
              className="input input-bordered w-full text-center"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <button className="btn btn-primary w-full" type="submit">
              Continue →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NamePage;