"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserProgressContextType {
    xp: number;
    completedTopics: number[]; // Array of global topic indices
    addXp: (amount: number) => void;
    markTopicAsCompleted: (topicIndex: number) => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export function UserProgressProvider({ children }: { children: React.ReactNode }) {
    const [xp, setXp] = useState(0);
    const [completedTopics, setCompletedTopics] = useState<number[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedXp = localStorage.getItem("levelUp_xp");
        const savedTopics = localStorage.getItem("levelUp_completedTopics");

        if (savedXp) setXp(parseInt(savedXp));
        if (savedTopics) setCompletedTopics(JSON.parse(savedTopics));
    }, []);

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem("levelUp_xp", xp.toString());
        localStorage.setItem("levelUp_completedTopics", JSON.stringify(completedTopics));
    }, [xp, completedTopics]);

    const addXp = (amount: number) => {
        setXp((prev) => prev + amount);
    };

    const markTopicAsCompleted = (topicIndex: number) => {
        if (!completedTopics.includes(topicIndex)) {
            setCompletedTopics((prev) => [...prev, topicIndex]);
            addXp(10); // Default 10 XP per topic, can be customized
        }
    };

    return (
        <UserProgressContext.Provider value={{ xp, completedTopics, addXp, markTopicAsCompleted }}>
            {children}
        </UserProgressContext.Provider>
    );
}

export function useUserProgress() {
    const context = useContext(UserProgressContext);
    if (context === undefined) {
        throw new Error("useUserProgress must be used within a UserProgressProvider");
    }
    return context;
}
