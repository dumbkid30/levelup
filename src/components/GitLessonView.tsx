"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Star, CheckCircle, ArrowLeft, BookOpen, Lightbulb } from "lucide-react";
import { useUserProgress } from "@/context/UserProgressContext";

interface GitLessonViewProps {
    lessonId: string;
    title: string;
    description: string;
    task: string;
    hint: string;
}

interface TerminalLine {
    type: 'input' | 'output' | 'error' | 'system';
    content: string;
}

export default function GitLessonView({ lessonId, title, description, task, hint }: GitLessonViewProps) {
    const { xp, markTopicAsCompleted, completedTopics } = useUserProgress();
    const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
        { type: 'system', content: 'Git Bash v2.45.0.windows.1' },
        { type: 'system', content: 'Welcome to LevelUp Git Simulation.' },
        { type: 'system', content: ' ' },
    ]);
    const [currentInput, setCurrentInput] = useState("");
    const [branch, setBranch] = useState("");
    const [repoInitialized, setRepoInitialized] = useState(false);
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
        const prompt = repoInitialized ? `user@LEVELUP MINGW64 /repo (${branch})` : `user@LEVELUP MINGW64 /`;
        const newHistory = [...terminalHistory, { type: 'input', content: `${prompt} $ ${cmd}` } as TerminalLine];

        if (!trimmedCmd) {
            setTerminalHistory(newHistory);
            return;
        }

        const args = trimmedCmd.split(' ');
        const baseCmd = args[0].toLowerCase();

        // Git Bash Simulation Logic
        if (baseCmd === 'clear') {
            setTerminalHistory([]);
            return;
        } else if (baseCmd === 'ls') {
            if (repoInitialized) {
                newHistory.push({ type: 'output', content: '.git  README.md  src/' });
            } else {
                newHistory.push({ type: 'output', content: 'projects/  documents/' });
            }
        } else if (trimmedCmd === 'git init') {
            setRepoInitialized(true);
            setBranch("main");
            newHistory.push({ type: 'output', content: 'Initialized empty Git repository in /repo/.git/' });
        } else if (trimmedCmd === 'git status') {
            if (repoInitialized) {
                newHistory.push({ type: 'output', content: `On branch ${branch}\nNo commits yet\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n\tREADME.md\n\tsrc/` });
            } else {
                newHistory.push({ type: 'error', content: 'fatal: not a git repository (or any of the parent directories): .git' });
            }
        } else if (trimmedCmd.startsWith('git add')) {
            if (repoInitialized) {
                newHistory.push({ type: 'output', content: '' });
            } else {
                newHistory.push({ type: 'error', content: 'fatal: not a git repository' });
            }
        } else if (trimmedCmd.startsWith('git commit')) {
            if (repoInitialized) {
                newHistory.push({ type: 'output', content: `[${branch} (root-commit) 8d584b6] ${args.slice(2).join(' ') || 'Initial commit'}\n 2 files changed, 25 insertions(+)` });
            } else {
                newHistory.push({ type: 'error', content: 'fatal: not a git repository' });
            }
        } else if (baseCmd === 'git') {
            newHistory.push({ type: 'output', content: 'usage: git [--version] [--help] [-C <path>] <command> [<args>]' });
        } else {
            newHistory.push({ type: 'error', content: `bash: ${baseCmd}: command not found` });
        }

        setTerminalHistory(newHistory);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(currentInput);
            setCurrentInput("");
        }
    };

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col">
            <header className="h-16 border-b border-gray-800 bg-gray-950 flex items-center justify-between px-4 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/landing" className="flex items-center gap-2 group">
                        <div className="text-xl font-bold text-white font-pixel">
                            <span className="text-yellow-500">👑</span> LevelUp
                        </div>
                    </Link>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 font-pixel text-xl font-bold uppercase tracking-widest text-white/90">
                    {title}
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-yellow-400 text-black font-bold font-pixel text-sm rounded transition-colors">
                        GIT TRACKER
                    </button>
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                <div className="w-[45%] border-r border-gray-800 bg-gray-900/30 flex flex-col overflow-y-auto">
                    <div className="p-6 space-y-8">
                        <div>
                            <div className="flex items-center gap-2 text-blue-400 mb-2 font-pixel uppercase text-sm">
                                <BookOpen className="w-4 h-4" />
                                <span>Git Module {lessonId}</span>
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
                            <p className="text-gray-400 leading-relaxed font-mono text-sm whitespace-pre-wrap">
                                {description}
                            </p>
                        </div>
                        <div className="bg-blue-900/10 border border-blue-500/20 rounded p-4">
                            <div className="flex items-center gap-2 text-blue-400 mb-3 font-pixel text-xs">
                                <CheckCircle className="w-4 h-4" />
                                <h3>OBJECTIVE</h3>
                            </div>
                            <p className="text-zinc-300 text-sm font-mono">
                                {task}
                            </p>
                        </div>
                        <div className="bg-yellow-900/10 border border-yellow-500/20 rounded p-4">
                            <div className="flex items-center gap-2 text-yellow-500 mb-3 font-pixel text-xs">
                                <Lightbulb className="w-4 h-4" />
                                <h3>HINT</h3>
                            </div>
                            <p className="text-zinc-400 text-xs italic font-mono">
                                {hint}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-[#0a0a0a] flex flex-col font-mono text-sm cursor-text" onClick={handleTerminalClick}>
                    <div className="h-7 bg-[#1e1e1e] border-b border-gray-800 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5 mr-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="text-gray-500 text-[10px] uppercase tracking-tighter">MINGW64:/c/projects/repo</div>
                    </div>

                    <div className="flex-1 p-5 overflow-y-auto">
                        {terminalHistory.map((line, index) => (
                            <div key={index} className={`mb-1 whitespace-pre-wrap ${line.type === 'input' ? 'text-white' :
                                    line.type === 'error' ? 'text-red-500' :
                                        line.type === 'system' ? 'text-yellow-500/70' :
                                            'text-green-400/90'
                                }`}>
                                {line.content}
                            </div>
                        ))}

                        <div className="flex items-start text-white">
                            <span className="text-green-400 mr-2 shrink-0">
                                {repoInitialized ? `user@LEVELUP MINGW64 /repo (${branch}) $` : `user@LEVELUP MINGW64 / $`}
                            </span>
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

            <footer className="h-16 bg-zinc-950 border-t border-white/5 flex items-center justify-between px-6">
                <Link href="/courses/git" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-pixel text-[10px] uppercase">
                    <ArrowLeft className="w-3 h-3" />
                    Exit Mission
                </Link>

                <div className="flex items-center gap-2 text-yellow-400 font-pixel text-sm">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    XP: {xp}
                </div>

                <div className="flex gap-4">
                    <button onClick={handleComplete} className="px-5 py-2 bg-yellow-400 text-black font-pixel text-xs border-b-2 border-r-2 border-yellow-600 active:border-0 transition-all">
                        {isCompleted ? 'SYNCED' : 'COMMIT PROGRESS'}
                    </button>
                </div>
            </footer>
        </div>
    );
}
