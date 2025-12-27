"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { motion, stagger, useAnimate } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";

const WordWrapper = ({ children }: { children: React.ReactNode }) => {
    if (typeof children !== "string") {
        return <>{children}</>;
    }

    return (
        <>
            {children.split(" ").map((word, i) => (
                <span key={i} className="word inline-block opacity-0 filter blur-[10px] whitespace-pre text-zinc-200">
                    {word}{" "}
                </span>
            ))}
        </>
    );
};

const AnimatedMarkdown = ({ content }: { content: string }) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (content && scope.current) {
            const elements = scope.current.querySelectorAll("span.word");
            if (elements.length > 0) {
                animate(
                    "span.word",
                    {
                        opacity: 1,
                        filter: "blur(0px)",
                    },
                    {
                        duration: 1, // Matches TextGenerateEffect default
                        delay: stagger(0.2), // Matches TextGenerateEffect default
                    }
                );
            }
        }
    }, [content, animate, scope]);

    return (
        <div ref={scope}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    table: ({ ...props }) => (
                        <div className="overflow-x-auto my-4 border-2 border-amber-500/20 rounded-lg">
                            <table className="w-full border-collapse bg-black/40" {...props} />
                        </div>
                    ),
                    th: ({ children, ...props }) => (
                        <th className="border border-amber-500/20 px-4 py-2 bg-amber-500/10 text-amber-400 text-left font-bold" {...props}>
                            <WordWrapper>{children}</WordWrapper>
                        </th>
                    ),
                    td: ({ children, ...props }) => (
                        <td className="border border-amber-500/20 px-4 py-2 text-sm" {...props}>
                            <WordWrapper>{children}</WordWrapper>
                        </td>
                    ),
                    strong: ({ children, ...props }) => (
                        <strong className="text-amber-400 font-bold" {...props}>
                            <WordWrapper>{children}</WordWrapper>
                        </strong>
                    ),
                    h1: ({ children, ...props }) => (
                        <h1 className="text-2xl font-bold text-amber-400 mb-4" {...props}>
                            <WordWrapper>{children}</WordWrapper>
                        </h1>
                    ),
                    h2: ({ children, ...props }) => (
                        <h2 className="text-xl font-bold text-amber-500 mb-3" {...props}>
                            <WordWrapper>{children}</WordWrapper>
                        </h2>
                    ),
                    h3: ({ children, ...props }) => (
                        <h3 className="text-lg font-bold text-amber-600 mb-2" {...props}>
                            <WordWrapper>{children}</WordWrapper>
                        </h3>
                    ),
                    p: ({ children }) => (
                        <div className="mb-4 text-zinc-200">
                            <WordWrapper>{children}</WordWrapper>
                        </div>
                    ),
                    li: ({ children }) => (
                        <li className="mb-1 text-zinc-200">
                            <WordWrapper>{children}</WordWrapper>
                        </li>
                    ),
                    a: ({ children, href, ...props }) => (
                        <LinkPreview
                            url={href as string}
                            className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/50 hover:decoration-blue-300 font-bold"
                            {...props}
                        >
                            <WordWrapper>{children}</WordWrapper>
                        </LinkPreview>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default function PlaceholdersAndVanishInputDemo() {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    // Debounced query tracking (req: use debounce)
    // In a real app, this could fetch suggestions.
    const _debouncedQuery = useDebounce(query, 500);

    const placeholders = [
        "roadmap for data enginnering",
        "question google asked in previous OA",
        "find a mentor for my startup",
        "how much oracle pay to sde 2 in india",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // The component handles visual vanish. We handle the data.
        if (!query) return;

        setLoading(true);
        setResponse("");

        try {
            const res = await fetch("/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: query }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setResponse(
                    data?.error ||
                    data?.details ||
                    "The Ask service is unavailable. Please try again or set API_KEY in .env.local."
                );
                return;
            }
            setResponse(data.response || "No response received.");
        } catch (error) {
            console.error("Ask Error:", error);
            setResponse("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col justify-center items-center px-4 w-full max-w-4xl mx-auto py-10">
            <h2 className="mb-4 sm:mb-8 text-xl text-center sm:text-5xl text-white">
                What do you want to levelUp today?
            </h2>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />

            {/* Response Area */}
            <div className="mt-10 w-full">
                {loading && (
                    <div className="text-center text-amber-300 font-mono animate-pulse">
                        Thinking...
                    </div>
                )}

                {response && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="p-6 rounded-2xl bg-zinc-900/90 border-2 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)] overflow-hidden"
                    >
                        <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 scrollbar-thin scrollbar-thumb-amber-400/20 scrollbar-track-transparent max-h-[60vh] overflow-y-auto font-pixel text-zinc-200">
                            <AnimatedMarkdown content={response} />
                        </div>
                    </motion.div>
                )}
            </div>
        </div >
    );
}
