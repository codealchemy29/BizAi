import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Courses from "@/pages/courses";
import CourseDetail from "@/pages/course-detail";
import Tools from "@/pages/tools";
import Playground from "@/pages/playground";
import Resources from "@/pages/resources";
import NotFound from "@/pages/not-found";
import Login from "./pages/login";
import AuthRedirect from "./pages/auth-redirect";
import Profile from "./pages/profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/:id" component={CourseDetail} />
      <Route path="/tools" component={Tools} />
      <Route path="/playground" component={Playground} />
      <Route path="/resources" component={Resources} />
      <Route path="/login" component={Login} />
      <Route path="/auth-redirect" component={AuthRedirect} />
      <Route path="/profile" component={Profile} />
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
