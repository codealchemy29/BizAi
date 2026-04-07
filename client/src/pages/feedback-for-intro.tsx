import FeedbackComponent from "../components/feedbackComponent";

const FeedbackForIntro = () => {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-background to-muted/50">
            <FeedbackComponent
                feedbackTitle="Introduction to AI"
                feedbackType="intro"
                feedbackDescription="Share your thoughts with us to help us improve."
            />
        </div>
    );
};

export default FeedbackForIntro;
