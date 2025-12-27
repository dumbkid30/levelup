import GitLessonView from "@/components/GitLessonView";

export default async function GitLessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
    const { lessonId } = await params;

    // Fallback data for now until API is updated/populated
    const lessonData = {
        title: "Introduction to Version Control",
        description: "Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later. \n\nGit is the most popular distributed version control system today.",
        task: "Use 'ls' to see current files and 'git init' to initialize your first repository.",
        hint: "Type 'git init' in the terminal on the right."
    };

    return (
        <GitLessonView
            lessonId={lessonId}
            title={lessonData.title}
            description={lessonData.description}
            task={lessonData.task}
            hint={lessonData.hint}
        />
    );
}
