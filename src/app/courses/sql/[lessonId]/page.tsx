import LessonView from "@/components/LessonView";

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
    const { lessonId } = await params;
    
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/lessons/${lessonId}`
        );
        
        if (!response.ok) {
            throw new Error('Lesson not found');
        }
        
        const lessonData = await response.json();
        
        return (
            <LessonView
                lessonId={lessonId}
                title={lessonData.title}
                description={lessonData.description}
                task={lessonData.task}
                hint={lessonData.hint}
                initialCode={lessonData.initialCode}
            />
        );
    } catch (error) {
        const fallbackData = {
            title: "SQL Lesson",
            description: "This is a placeholder for the lesson content. In a real application, this content would be fetched from a database based on the lesson ID.",
            task: "Complete the exercise to proceed.",
            hint: "Check the documentation if you get stuck.",
            initialCode: `-- Write your SQL query here\nSELECT * FROM users;`
        };
        
        return (
            <LessonView
                lessonId={lessonId}
                title={fallbackData.title}
                description={fallbackData.description}
                task={fallbackData.task}
                hint={fallbackData.hint}
                initialCode={fallbackData.initialCode}
            />
        );
    }
}
