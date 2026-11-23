import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !dueDate) {
      return setError("Title and due date are required.");
    }
    setError("");
    try {
      await onAdd({ title: title.trim(), subject: subject.trim(), dueDate });
      setTitle(""); setSubject(""); setDueDate("");
    } catch {
      setError("Could not save task. Try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
      {error && <p role="alert" className="text-red-600 text-sm">{error}</p>}
      <div>
        <label htmlFor="title" className="block text-sm font-medium">Task title</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full border rounded p-2" />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
        <input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}
          className="mt-1 w-full border rounded p-2" />
      </div>
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium">Due date</label>
        <input id="dueDate" type="date" value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 w-full border rounded p-2" />
      </div>
      <button type="submit"
        className="w-full bg-orange-500 text-white rounded p-2 hover:bg-orange-600">
        Save task
      </button>
    </form>
  );
}