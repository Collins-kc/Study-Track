import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import useTasks from "../hooks/useTasks";

export default function Dashboard() {
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks();

  return (
    <>
      <Navbar />
      <main className="p-4 max-w-2xl mx-auto space-y-4">
        <h1 className="text-xl font-bold text-blue-600">My Tasks</h1>
        <TaskForm onAdd={addTask} />
        {loading && <p>Loading tasks...</p>}
        {error && <p role="alert" className="text-red-600">{error}</p>}
        {!loading && tasks.length === 0 && (
          <p className="text-gray-500">No tasks yet. Add your first one!</p>
        )}
        <ul className="space-y-2">
          {tasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      </main>
    </>
  );
}