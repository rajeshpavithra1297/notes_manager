import { FileText, LogOut, Plus, Search, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/noteService";

export function Dashboard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchText, setSearchText] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState("");

  const [showModal, setShowModal] = useState(false);

  const fetchNotes = async () => {
    try {
      const { response, data } = await getNotes();

      if (!response.ok) {
        alert(data.message);
        return null;
      }
      setNotes(data);
      return data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadNotes = async () => {
      const data = await fetchNotes();

      if (data) {
        setNotes(data);
      }
    };

    loadNotes();
  }, []);

  const handleCreateNote = async (e) => {
    e.preventDefault();

    try {
      const { response, data } = await createNote(title, description);

      console.log("Create note:", data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setNotes((prevNotes) => [...prevNotes, data.note]);

      setTitle("");
      setDescription("");
      setShowModal(false);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleEdit = (note) => {
    setEditingNoteId(note._id);
    setTitle(note.title);
    setDescription(note.description);

    setShowModal(true);
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();

    try {
      const { response, data } = await updateNote(
        editingNoteId,
        title,
        description,
      );

      console.log("Update note:", data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

     await fetchNotes();

      setTitle("");
      setDescription("");
      setEditingNoteId(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const { response, data } = await deleteNote(noteId);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      await fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
              <FileText size={22} />
            </div>

            <h1 className="text-xl font-bold text-slate-800">Secure Notes</h1>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-slate-600">
              <User size={20} />

              <span><h2>
  Welcome, {user.name}
</h2></span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition"
            >
              <LogOut size={20} />

              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">My Notes</h2>

            <p className="text-slate-500 mt-1">
              Create and manage your personal notes.
            </p>
          </div>

          {/* Add Note */}
          <button
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            onClick={() => setShowModal(true)}
          >
            <Plus size={20} />
            New Note
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search your notes..."
            className="w-full bg-white border border-slate-300 rounded-lg py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {note.title}
              </h3>

              <p className="text-slate-500 leading-relaxed mb-6">
                {note.description}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(note)}
                  className="flex-1 border border-slate-300 text-slate-700 py-2 rounded-lg hover:bg-slate-50 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Create New Note
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={editingNoteId ? handleUpdateNote : handleCreateNote}
            >
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title"
                  className="w-full border border-slate-300 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write your note..."
                  rows="5"
                  className="w-full border border-slate-300 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-slate-300 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
