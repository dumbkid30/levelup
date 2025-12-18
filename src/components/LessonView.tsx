"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Star, CheckCircle, ArrowLeft, BookOpen, Lightbulb } from "lucide-react";
import { useUserProgress } from "@/context/UserProgressContext";

interface LessonViewProps {
    lessonId: string;
    title: string;
    description: string;
    task: string;
    hint: string;
    initialCode: string;
}

interface TerminalLine {
    type: 'input' | 'output' | 'error' | 'system';
    content: string;
}

export default function LessonView({ lessonId, title, description, task, hint, initialCode }: LessonViewProps) {
    const { xp, markTopicAsCompleted, completedTopics } = useUserProgress();
    const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
        { type: 'system', content: 'Welcome to the MySQL Monitor.  Commands end with ; or \\g.' },
        { type: 'system', content: 'Your MySQL connection id is 8' },
        { type: 'system', content: 'Server version: 8.0.35 MySQL Community Server - GPL' },
        { type: 'system', content: ' ' },
        { type: 'system', content: 'Type \'help;\' or \'\\h\' for help. Type \'\\c\' to clear the current input statement.' },
        { type: 'system', content: ' ' },
    ]);
    const [currentInput, setCurrentInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalEndRef = useRef<HTMLDivElement>(null);

    const isCompleted = completedTopics.includes(parseInt(lessonId));

    const handleComplete = () => {
        if (!isCompleted) {
            markTopicAsCompleted(parseInt(lessonId));
        }
    };

    const scrollToBottom = () => {
        terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [terminalHistory]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        const newHistory = [...terminalHistory, { type: 'input', content: `mysql> ${cmd}` } as TerminalLine];

        if (!trimmedCmd) {
            setTerminalHistory(newHistory);
            return;
        }

        const lowerCmd = trimmedCmd.toLowerCase();

        // Mock Command Logic
        if (lowerCmd === 'clear' || lowerCmd === '\\! clear') {
            setTerminalHistory([]);
            return;
        } else if (lowerCmd.includes('show databases')) {
            newHistory.push({
                type: 'output', content: `+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| universitydb       |
+--------------------+
5 rows in set (0.00 sec)`
            });
        } else if (lowerCmd.includes('select') && lowerCmd.includes('from')) {
            newHistory.push({ type: 'output', content: 'Empty set (0.00 sec)' });
        } else if (lowerCmd.includes('create database')) {
            newHistory.push({ type: 'output', content: 'Query OK, 1 row affected (0.01 sec)' });
        } else if (lowerCmd.includes('use')) {
            newHistory.push({ type: 'output', content: 'Database changed' });
        } else if (lowerCmd === 'help;' || lowerCmd === '\\h') {
            newHistory.push({ type: 'output', content: 'List of all MySQL commands:\nNote that all text commands must be first on line and end with \';\'\n...' });
        } else {
            newHistory.push({ type: 'error', content: `ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '${trimmedCmd}' at line 1` });
        }

        setTerminalHistory(newHistory);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(currentInput);
            setCurrentInput("");
        }
    };

    // Focus input when clicking anywhere in terminal
    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col">
            {/* Navbar */}
            <header className="h-16 border-b border-gray-800 bg-gray-950 flex items-center justify-between px-4 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="text-xl font-bold text-white font-pixel">
                            <span className="text-yellow-500">👑</span> LevelUp
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
                {/* Left Panel - Instructions */}
                <div className="w-[55%] border-r border-gray-800 bg-gray-900/50 flex flex-col overflow-y-auto">
                    <div className="p-6 space-y-8">
                        {/* Header */}
                        <div>
                            <div className="flex items-center gap-2 text-green-400 mb-2">
                                <BookOpen className="w-5 h-5" />
                                <span className="font-bold font-pixel uppercase tracking-wide">Lesson {lessonId}</span>
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {description}
                            </p>
                        </div>

                        {/* Task */}
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-5">
                            <div className="flex items-center gap-2 text-blue-400 mb-3">
                                <CheckCircle className="w-5 h-5" />
                                <h3 className="font-bold font-pixel uppercase">Task</h3>
                            </div>
                            <p className="text-blue-100/80 text-sm leading-relaxed">
                                {task}
                            </p>
                        </div>

                        {/* Hint */}
                        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-5">
                            <div className="flex items-center gap-2 text-yellow-400 mb-3">
                                <Lightbulb className="w-5 h-5" />
                                <h3 className="font-bold font-pixel uppercase">Hint</h3>
                            </div>
                            <p className="text-yellow-100/80 text-sm leading-relaxed">
                                {hint}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Interactive Terminal */}
                <div
                    className="flex-1 bg-[#0c0c0c] flex flex-col font-mono text-sm cursor-text"
                    onClick={handleTerminalClick}
                >
                    <div className="h-8 bg-[#1a1a1a] border-b border-gray-800 flex items-center px-4 gap-2">
                        <div className="text-gray-400 text-xs">Terminal - MySQL</div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto">
                        {terminalHistory.map((line, index) => (
                            <div key={index} className={`mb-1 whitespace-pre-wrap ${line.type === 'input' ? 'text-white' :
                                    line.type === 'error' ? 'text-red-400' :
                                        line.type === 'system' ? 'text-gray-400' :
                                            'text-gray-300'
                                }`}>
                                {line.content}
                            </div>
                        ))}

                        <div className="flex items-center text-white">
                            <span className="text-gray-400 mr-2">mysql&gt;</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={currentInput}
                                onChange={(e) => setCurrentInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                            />
                        </div>
                        <div ref={terminalEndRef} />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="h-16 bg-gray-900 border-t border-gray-800 flex items-center justify-between px-6">
                <Link href="/courses/sql" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back To Course Detail
                </Link>

                <div className="flex items-center gap-2 text-yellow-400 font-bold font-pixel text-lg animate-pulse">
                    <Star className="w-6 h-6 fill-yellow-400" />
                    Total XP: {xp}
                </div>

                <div className="flex items-center gap-4">
                    <button className="px-6 py-2 bg-gray-800 text-white font-bold rounded border border-gray-700 hover:bg-gray-700 transition-colors">
                        Previous
                    </button>
                    <button
                        onClick={handleComplete}
                        className="px-6 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500 transition-colors"
                    >
                        {isCompleted ? 'Completed' : 'Next'}
                    </button>
                </div>
            </footer>
        </div>
    );
}
