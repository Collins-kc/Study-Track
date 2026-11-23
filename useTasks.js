import { useEffect, useState } from "react";
import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, query, where, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

export default function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""));
        setTasks(list);
        setLoading(false);
      },
      () => {
        setError("Could not load tasks.");
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [user]);

  const addTask = (task) =>
    addDoc(collection(db, "tasks"), {
      ...task, done: false, userId: user.uid, createdAt: serverTimestamp(),
    });
  const updateTask = (id, changes) => updateDoc(doc(db, "tasks", id), changes);
  const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

  return { tasks, loading, error, addTask, updateTask, deleteTask };
}