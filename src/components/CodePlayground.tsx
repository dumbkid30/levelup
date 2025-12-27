"use client";
import React from "react";
import { RotateCw, Settings, Maximize2 } from "lucide-react";

export const CodePlayground = () => {
    return (
        <div className="w-full h-full bg-[#1e1e1e] rounded-xl overflow-hidden flex flex-col font-sans border border-[#333]">
            {/* Top Bar */}
            <div className="h-12 bg-[#1e1e1e] border-b border-[#333] flex items-center justify-between px-4">
                <h2 className="text-[#e1e1e1] font-semibold text-lg">Playground</h2>

                {/* Strict Mode Badge & Controls */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a2e24] border border-[#1f402f]">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-mono text-green-400 font-medium">STRICT MODE</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-400">
                        <RotateCw size={14} className="hover:text-white cursor-pointer" />
                        <Settings size={14} className="hover:text-white cursor-pointer" />
                        <Maximize2 size={14} className="hover:text-white cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex min-h-0">

                {/* Editor Side */}
                <div className="w-1/2 flex flex-col border-r border-[#333]">
                    {/* Tabs */}
                    <div className="flex border-b border-[#333]">
                        <div className="px-4 py-2 bg-[#1e1e1e] border-b-2 border-yellow-500 text-yellow-500 text-sm font-medium">
                            App.js
                        </div>
                        <div className="px-4 py-2 text-gray-500 text-sm font-medium hover:text-gray-300 cursor-pointer">
                            styles.css
                        </div>
                    </div>

                    {/* Code Content */}
                    <div className="flex-1 p-4 overflow-auto font-mono text-sm leading-relaxed bg-[#1e1e1e]">
                        <div className="text-gray-400">
                            <span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;
                        </div>
                        <br />
                        <div className="text-gray-300">
                            <span className="text-blue-400">function</span> <span className="text-yellow-400">App</span>() {'{'}
                        </div>
                        <div className="text-gray-300 pl-4">
                            <span className="text-purple-400">return</span> (
                        </div>
                        <div className="text-gray-300 pl-8">
                            &lt;<span className="text-red-400">main</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-12">
                            &lt;<span className="text-red-400">section</span> <span className="text-yellow-300">className</span>=<span className="text-green-400">"column"</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-16">
                            &lt;<span className="text-red-400">header</span>&gt;Upcoming&lt;/<span className="text-red-400">header</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-16">
                            &lt;<span className="text-red-400">div</span> <span className="text-yellow-300">className</span>=<span className="text-green-400">"cards"</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-20">
                            &lt;<span className="text-red-400">button</span> <span className="text-yellow-300">className</span>=<span className="text-green-400">"card"</span>&gt;Buy cat food&lt;/<span className="text-red-400">button</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-20">
                            &lt;<span className="text-red-400">button</span> <span className="text-yellow-300">className</span>=<span className="text-green-400">"card"</span>&gt;File taxes&lt;/<span className="text-red-400">button</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-16">
                            &lt;/<span className="text-red-400">div</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-12">
                            &lt;/<span className="text-red-400">section</span>&gt;
                        </div>
                        <br />
                        <div className="text-gray-300 pl-12">
                            &lt;<span className="text-red-400">section</span> <span className="text-yellow-300">className</span>=<span className="text-green-400">"column"</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-16">
                            &lt;<span className="text-red-400">header</span>&gt;Finished&lt;/<span className="text-red-400">header</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-16">
                            &lt;<span className="text-red-400">div</span> <span className="text-yellow-300">className</span>=<span className="text-green-400">"cards"</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-20">
                            &lt;<span className="text-red-400">button</span> <span className="text-yellow-300">className</span>=<span className="text-green-400">"card"</span>&gt;
                            <div className="pl-4">Buy Amina's birthday present</div>
                            &lt;/<span className="text-red-400">button</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-20">
                            &lt;<span className="text-red-400">button</span> <span className="text-yellow-300">className</span>=<span className="text-green-400">"card"</span>&gt;
                            <div className="pl-4">Schedule haircut</div>
                            &lt;/<span className="text-red-400">button</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-16">
                            &lt;/<span className="text-red-400">div</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-12">
                            &lt;/<span className="text-red-400">section</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-8">
                            &lt;/<span className="text-red-400">main</span>&gt;
                        </div>
                        <div className="text-gray-300 pl-4">
                            );
                        </div>
                        <div className="text-gray-300">
                            {'}'}
                        </div>
                        <br />
                        <div className="text-gray-300">
                            <span className="text-purple-400">export default</span> App;
                        </div>
                    </div>
                </div>

                {/* Preview Side */}
                <div className="w-1/2 bg-[#1e1e1e] flex flex-col">
                    {/* Preview Header */}
                    <div className="h-10 border-b border-[#333] flex items-center px-4 gap-4 text-sm text-gray-400">
                        <span className="text-white border-b-2 border-yellow-500 pb-[10px] pt-2">Result</span>
                        <span className="pb-[10px] pt-2 hover:text-white cursor-pointer">Console</span>
                    </div>

                    {/* Preview Canvas */}
                    <div className="flex-1 bg-[#1d5d9b] p-6 font-sans">
                        <div className="flex gap-4 h-full">
                            {/* Column 1 */}
                            <div className="w-1/2 bg-[#e0e0e0] rounded-lg p-3 flex flex-col gap-3 h-min">
                                <h3 className="text-gray-800 font-medium">Upcoming</h3>
                                <div className="bg-white p-3 rounded shadow-sm text-center text-gray-800 font-medium cursor-pointer hover:shadow-md transition-shadow">
                                    Buy cat food
                                </div>
                                <div className="bg-white p-3 rounded shadow-sm text-center text-gray-800 font-medium cursor-pointer hover:shadow-md transition-shadow">
                                    File taxes
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="w-1/2 bg-[#e0e0e0] rounded-lg p-3 flex flex-col gap-3 h-min">
                                <h3 className="text-gray-800 font-medium">Finished</h3>
                                <div className="bg-white p-3 rounded shadow-sm text-center text-gray-800 font-medium cursor-pointer hover:shadow-md transition-shadow">
                                    Buy Amina's<br />birthday<br />present
                                </div>
                                <div className="bg-white p-3 rounded shadow-sm text-center text-gray-800 font-medium cursor-pointer hover:shadow-md transition-shadow">
                                    Schedule<br />haircut
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
