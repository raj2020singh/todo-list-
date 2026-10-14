import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]); // 
  const [input, setInput] = useState("");

  const add = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), done: false }]);
    setInput("");
  };

  const toggle = (id) =>
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );

  const remove = (id) =>
    setTodos(todos.filter((t) => t.id !== id));

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <h2 style={{ marginBottom: 16 }}>Todo List</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add a task..."
          style={{ flex: 1, padding: "8px 10px", fontSize: 14, border: "1px solid #ccc", borderRadius: 6 }}
        />
        <button onClick={add} style={{ padding: "8px 14px", cursor: "pointer" }}>
          Add
        </button>
      </div>

      {todos.length === 0 && <p style={{ color: "#999" }}>No tasks yet.</p>}

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {todos.map((t) => (
          <li key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #eee" }}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(t.id)}
            />
            <span
              style={{
                flex: 1,
                textDecoration: t.done ? "line-through" : "none",
                color: t.done ? "#aaa" : "#000",
              }}
            >
              {t.text}
            </span>
            <button
              onClick={() => remove(t.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#999",
                fontSize: 16,
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {todos.some((t) => t.done) && (
        <button
          onClick={() => setTodos(todos.filter((t) => !t.done))}
          style={{
            marginTop: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#999",
            fontSize: 13,
          }}
        >
          Clear completed
        </button>
      )}
    </div>
  );
}

export default App;