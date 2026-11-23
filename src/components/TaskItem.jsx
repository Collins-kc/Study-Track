import { useState } from "react";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  async function save() {
    if (!title.trim()) return;
    await onUpdate(task.id, { title: title.trim() });
    setEditing(false);
  }

  return (
    <li className="bg-white p-3 rounded shadow flex items-center gap-3">
      <input type="checkbox" checked={task.done} aria-label={`Mark ${task.title} as done`}
        onChange={() => onUpdate(task.id, { done: !task.done })} />
      <div className="flex-1">
        {editing ? (
          <input value={title} onChange={(e) => setTitle(e.target.value)}
            aria-label="Edit title" className="w-full border rounded p-1" />
        ) : (
          <p className={task.done ? "line-through text-gray-400" : "font-medium"}>
            {task.title}
          </p>
        )}
        <p className="text-sm text-gray-500">{task.subject} · Due {task.dueDate}</p>
      </div>
      {editing ? (
        <button onClick={save} className="text-blue-600 text-sm">Save</button>
      ) : (
        <button onClick={() => setEditing(true)} className="text-blue-600 text-sm">Edit</button>
      )}
      <button onClick={() => onDelete(task.id)} className="text-red-600 text-sm">Delete</button>
    </li>
  );
}