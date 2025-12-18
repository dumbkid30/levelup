"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <div className="h-full w-full rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden border border-white/10">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-sm font-mono text-white/70">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>greatfrontend.com</span>
              <span className="text-white/30">/interviews/todo-list</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-amber-500/10 border border-amber-500/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-200">
                React
              </span>
              <span className="rounded-full bg-cyan-500/10 border border-cyan-500/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
                UI + JS
              </span>
            </div>
          </div>

          <div className="grid h-[calc(100%-52px)] grid-cols-1 md:grid-cols-2">
            <div className="border-r border-white/5 bg-slate-900/60 p-4 md:p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/50 flex items-center justify-center text-amber-200 font-bold">
                  TL
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">Prompt</p>
                  <h3 className="text-xl font-semibold text-white">Todo List</h3>
                  <p className="text-xs text-white/50">20 mins - Medium</p>
                </div>
              </div>

              <div className="space-y-2 text-sm font-mono text-white/70">
                <p>- Add new tasks on clicking "Submit".</p>
                <p>- Clear the input on successful addition.</p>
                <p>- Delete tasks when "Delete" is clicked.</p>
                <p className="text-emerald-300">Focus is on JavaScript correctness.</p>
              </div>

              <div className="mt-auto rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/60 font-mono">
                <p className="text-white">Notes</p>
                <p className="mt-1">
                  Use a real DOM event flow; keep state simple and avoid over-engineering. Handle empty input gracefully.
                </p>
              </div>
            </div>

            <div className="grid grid-rows-2 bg-slate-950/70">
              <div className="border-b border-white/10 bg-[#0b1224] p-4 overflow-auto">
                <div className="flex items-center justify-between text-xs text-white/50 font-mono">
                  <span>App.jsx</span>
                  <span>Live coding</span>
                </div>
                <pre className="mt-3 text-xs leading-relaxed text-white/80 font-mono whitespace-pre-wrap">
{`export default function App() {
  const [items, setItems] = useState([
    "Walk the dog",
    "Water the plants",
    "Wash the dishes",
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setItems([...items, value.trim()]);
    setValue("");
  };

  return (
    <div className="todo-card">
      <h1>Todo List</h1>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button>Submit</button>
      </form>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item}
            <button onClick={() => remove(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`}
                </pre>
              </div>

              <div className="bg-black p-6">
                <div className="mx-auto w-full max-w-xl rounded-lg border border-white/10 bg-slate-900/80 p-4 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                    <span>Browser</span>
                    <div className="flex gap-1">
                      <span className="inline-flex h-2 w-2 rounded-full bg-red-400" />
                      <span className="inline-flex h-2 w-2 rounded-full bg-amber-400" />
                      <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <h3 className="text-lg font-semibold">Todo List</h3>
                    <div className="flex gap-2 text-sm">
                      <input
                        className="w-full rounded-md border border-white/20 bg-black/50 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Keep..."
                        value="Keep..."
                        readOnly
                      />
                      <button className="rounded-md border border-amber-500/50 bg-amber-500/20 px-3 py-2 text-amber-100 font-semibold">
                        Submit
                      </button>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {["Walk the dog", "Water the plants", "Wash the dishes"].map((item) => (
                        <li
                          key={item}
                          className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2"
                        >
                          <span>{item}</span>
                          <button className="rounded-sm border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/80">
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
