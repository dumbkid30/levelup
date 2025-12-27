import JSLessonView from "@/components/JSLessonView";

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
      <JSLessonView
        lessonId={lessonId}
        title={lessonData.title}
        subtopics={lessonData.subtopics}
        task={lessonData.task}
        hint={lessonData.hint}
        initialCode={lessonData.initialCode}
      />
    );
  } catch (_error) {
    const fallbackData = {
      title: "JavaScript Lesson",
      subtopics: [
        {
          title: "Under Construction",
          content: "Content for this lesson is coming soon! Please check back later."
        }
      ],
      task: "This lesson is under construction.",
      hint: "Stay tuned for updates.",
      initialCode: `console.log("Coming Soon...");`
    };

    return (
      <JSLessonView
        lessonId={lessonId}
        title={fallbackData.title}
        subtopics={fallbackData.subtopics}
        task={fallbackData.task}
        hint={fallbackData.hint}
        initialCode={fallbackData.initialCode}
      />
    );
  }
}
