import { Switch, Route} from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Courses from "@/pages/courses";
import CourseDetail from "@/pages/course-detail";
import Tools from "@/pages/tools";
import Playground from "@/pages/playground";
import Resources from "@/pages/resources";
import NotFound from "@/pages/not-found";
import Login from "./pages/login";
import AuthRedirect from "./pages/auth-redirect";
import Profile from "./pages/profile";
import CouponRedeem from "./pages/coupon";
import FeedbackForIntro from "./pages/feedback-for-intro";
import Learn from "./pages/learn";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/navbar" component={Navbar} />
      <Route path="/footer" component={Footer} />
      <Route path="/learn" component={Learn} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/:id" component={CourseDetail} />
      <Route path="/tools" component={Tools} />
      <Route path="/playground" component={Playground} />
      <Route path="/resources" component={Resources} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/auth-redirect" component={AuthRedirect} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/coupon" component={CouponRedeem} />
      <Route path="/profile" component={Profile} />
      <Route path="/feedback-for-intro" component={FeedbackForIntro} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
