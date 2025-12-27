"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, CheckCircle, ArrowLeft, Lightbulb, Play, Trash2 } from "lucide-react";
import { useUserProgress } from "@/context/UserProgressContext";

interface SubTopic {
    title: string;
    content: string;
}

interface JSLessonViewProps {
    lessonId: string;
    title: string;
    subtopics?: SubTopic[];
    description?: string;
    task: string;
    hint: string;
    initialCode: string;
}

// Custom Renderer to make the text content look beautiful
const ContentRenderer = ({ content }: { content: string }) => {
    return (
        <div className="space-y-4 font-sans text-gray-300 leading-relaxed text-base">
            {content.split('\n').map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={i} className="h-4" />; // Spacer for empty lines

                // Bullet points
                if (trimmed.startsWith('•')) {
                    return (
                        <div key={i} className="flex items-start gap-3 ml-2">
                            <span className="text-yellow-500 mt-1.5">•</span>
                            <span className="text-gray-200">{trimmed.substring(1)}</span>
                        </div>
                    );
                }

                // Numbered lists or small headers (e.g., "1. Introduction")
                if (/^\d+\./.test(trimmed)) {
                    return (
                        <h3 key={i} className="text-xl font-bold text-white mt-8 mb-3 tracking-tight">
                            {trimmed}
                        </h3>
                    );
                }

                // Key-Value style or Subheadings (lines ending with colon or short uppercased)
                if (trimmed.endsWith(':') || (trimmed.length < 40 && /^[A-Z\s]+$/.test(trimmed))) {
                    return (
                        <h4 key={i} className="text-lg font-semibold text-gray-100 mt-6 mb-2">
                            {trimmed}
                        </h4>
                    );
                }

                // Code blocks (start with spacing or distinct font needs) - simple heuristic
                if (trimmed.includes('//') || trimmed.includes('let ') || trimmed.includes('const ') || trimmed.includes('function')) {
                    return (
                        <div key={i} className="bg-gray-900/50 border-l-2 border-yellow-500/50 pl-4 py-2 my-2 font-mono text-sm text-yellow-100/90 rounded-r shadow-sm">
                            {trimmed}
                        </div>
                    );
                }

                // Default paragraph
                return <p key={i} className="mb-2 leading-7">{trimmed}</p>;
            })}
        </div>
    );
};

export default function JSLessonView({ lessonId, title, subtopics = [], description, task, hint, initialCode }: JSLessonViewProps) {
    const { xp, markTopicAsCompleted, completedTopics } = useUserProgress();
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [activeTopicIndex, setActiveTopicIndex] = useState(0);

    const isCompleted = completedTopics.includes(parseInt(lessonId));

    // Fallback if no subtopics provided, treat description as one big topic
    const filteredSubtopics = Array.isArray(subtopics) ? subtopics.filter(Boolean) : [];
    const effectiveSubtopics = filteredSubtopics.length > 0 ? filteredSubtopics : [{ title: "Introduction", content: description || "" }];
    const safeIndex = Math.min(activeTopicIndex, effectiveSubtopics.length - 1);
    const activeTopic = effectiveSubtopics[safeIndex];

    const handleComplete = () => {
        if (!isCompleted) {
            markTopicAsCompleted(parseInt(lessonId));
        }
    };

    const runCode = () => {
        setError(null);
        setOutput([]);

        const logs: string[] = [];
        const originalConsoleLog = console.log;

        // Override console.log to capture output
        console.log = (...args) => {
            logs.push(args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
            originalConsoleLog(...args);
        };

        try {
            eval(code);
            setOutput(logs.length > 0 ? logs : ["(No output)"]);
        } catch (err: any) {
            setError(err.toString());
        } finally {
            console.log = originalConsoleLog;
        }
    };

    return (
        <div className="h-screen overflow-hidden bg-black text-white font-sans flex flex-col">
            {/* Navbar */}
            <header className="h-16 border-b border-gray-800 bg-gray-950 flex items-center justify-between px-4 z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-28 h-8">
                            <Image
                                src="/assets/logo/logo.png"
                                alt="LevelUp Logo"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 font-pixel text-xl font-bold uppercase tracking-widest text-white/90">
                    {title}
                </div>

                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-yellow-400 text-black font-bold font-pixel text-sm rounded hover:bg-yellow-500 transition-colors">
                        Dashboard
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-500 border-2 border-white"></div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel - Documentation Browser (55% width) */}
                <div className="w-[55%] flex border-r border-gray-800 bg-[#0a0a0a]">

                    {/* Inner Sidebar - Topic List */}
                    <div className="w-1/3 border-r border-gray-800 bg-black flex flex-col overflow-y-auto py-6">
                        <div className="px-4 mb-4 text-xs font-bold text-gray-500 uppercase tracking-wider font-pixel opacity-70">
                            Lesson {parseInt(lessonId) - 200}
                        </div>
                        <div className="flex flex-col relative">
                            {/* Vertical Line for connection feel */}
                            <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gray-900 z-0"></div>

                            {effectiveSubtopics.map((topic, index) => {
                                const isActive = index === activeTopicIndex;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTopicIndex(index)}
                                        className={`relative z-10 flex items-center gap-3 py-3 px-4 text-left transition-all group w-full ${isActive ? 'bg-gray-900/50' : 'hover:bg-gray-900/30'}`}
                                    >
                                        <div className={`w-2.5 h-2.5 rounded-full border-2 shrink-0 transition-all ${isActive ? 'bg-green-500 border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] scale-110' : 'bg-black border-gray-700 group-hover:border-gray-500'}`} />
                                        <span className={`text-xs font-medium leading-tight transition-colors line-clamp-2 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                            {topic.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Active Topic Content */}
                    <div className="w-2/3 overflow-y-auto bg-[#111] scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                        <div className="p-8 pb-32">
                            <h2 className="text-3xl font-extrabold text-white mb-8 font-sans tracking-tight border-b border-gray-800 pb-4">
                                {activeTopic.title}
                            </h2>

                            <ContentRenderer content={activeTopic.content} />

                            {/* Task & Hint pinned to bottom of content or after text */}
                            <div className="mt-12 space-y-6 pt-8 border-t border-gray-800">
                                {/* Task */}
                                <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-5">
                                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                                        <CheckCircle className="w-4 h-4" />
                                        <h3 className="font-bold font-pixel uppercase text-xs">Task</h3>
                                    </div>
                                    <p className="text-blue-100/70 text-sm">
                                        {task}
                                    </p>
                                </div>

                                {/* Hint */}
                                <div className="bg-yellow-900/10 border border-yellow-500/20 rounded-lg p-5">
                                    <div className="flex items-center gap-2 text-yellow-400 mb-2">
                                        <Lightbulb className="w-4 h-4" />
                                        <h3 className="font-bold font-pixel uppercase text-xs">Hint</h3>
                                    </div>
                                    <p className="text-yellow-100/70 text-sm">
                                        {hint}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Split Playground (remaining width) */}
                <div className="flex-1 flex flex-col bg-[#0c0c0c]">

                    {/* Toolbar */}
                    <div className="h-12 bg-[#1a1a1a] border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="text-xs text-gray-400 font-mono">main.js</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCode(initialCode)}
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                                title="Reset Code"
                            >
                                <Trash2 size={16} />
                            </button>
                            <button
                                onClick={runCode}
                                className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-bold font-mono rounded transition-colors"
                            >
                                <Play size={14} fill="currentColor" />
                                RUN
                            </button>
                        </div>
                    </div>

                    {/* Split View */}
                    <div className="flex-1 flex flex-row overflow-hidden">
                        {/* Editor (Left) */}
                        <div className="w-1/2 border-r border-gray-800 flex flex-col">
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="flex-1 w-full bg-[#0c0c0c] text-gray-300 font-mono text-sm p-4 outline-none resize-none leading-relaxed"
                                spellCheck={false}
                                placeholder="// Write your JavaScript code here..."
                            />
                        </div>

                        {/* Output (Right) */}
                        <div className="w-1/2 flex flex-col bg-[#111]">
                            <div className="h-8 bg-[#1a1a1a] border-b border-gray-800 flex items-center px-4 shrink-0">
                                <span className="text-xs text-gray-400 font-mono">Console Output</span>
                            </div>
                            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
                                {error && (
                                    <div className="text-red-400 whitespace-pre-wrap">{error}</div>
                                )}
                                {output.map((line, i) => (
                                    <div key={i} className="text-gray-300 whitespace-pre-wrap border-b border-gray-800/50 pb-1 mb-1 last:border-0">{line}</div>
                                ))}
                                {output.length === 0 && !error && (
                                    <div className="text-gray-600 italic">Run code to see output...</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="h-16 bg-gray-900 border-t border-gray-800 flex items-center justify-between px-6 shrink-0">
                <Link href="/courses/javascript-backend" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back To Course Detail
                </Link>

                <div className="flex items-center gap-2 text-yellow-400 font-bold font-pixel text-lg animate-pulse">
                    <Star className="w-6 h-6 fill-yellow-400" />
                    Total XP: {xp}
                </div>

                <button
                    onClick={handleComplete}
                    className="px-6 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500 transition-colors"
                >
                    {isCompleted ? 'Completed' : 'Complete & Next'}
                </button>
            </footer>
        </div>
    );
}
