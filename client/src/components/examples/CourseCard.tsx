import { CourseCard } from "../CourseCard";

export default function CourseCardExample() {
  return (
    <div className="max-w-sm">
      <CourseCard
        id="intro-ml"
        title="Introduction to Machine Learning"
        description="Learn the fundamentals of machine learning, from basic concepts to building your first models."
        category="Machine Learning"
        difficulty="Beginner"
        duration="4 hours"
      />
    </div>
  );
}
