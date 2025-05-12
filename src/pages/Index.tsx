
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 5v14" />
              <path d="M14 9h5" />
              <path d="M14 15h5" />
              <path d="M5 9h3" />
              <path d="M5 12h3" />
              <path d="M5 15h3" />
            </svg>
            <h1 className="font-bold text-2xl">Taskify</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">Demo</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center">
        <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center">
          <div className="flex-1 space-y-6 mb-8 md:mb-0 md:pr-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
              Manage your tasks with ease
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
              Taskify helps you organize your tasks, track progress, and boost productivity 
              with a clean and intuitive interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/dashboard">Try Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 p-1 shadow-lg">
              <div className="bg-card rounded-lg overflow-hidden">
                <img 
                  src="https://placehold.co/600x400/2563eb/FFFFFF/?text=Taskify+Demo" 
                  alt="Taskify Demo" 
                  className="w-full h-auto object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 9L21 21" />
                  <path d="M19 9h2v2" />
                  <path d="M3 17c0 .3 0 .5.2.7 1.2 1.1 3 2 4.8 2 1 0 1.8-.2 2.6-.5" />
                  <circle cx="12" cy="6" r="4" />
                  <path d="M10 10H8a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Drag and Drop</h3>
              <p className="text-muted-foreground">Easily move tasks between columns with intuitive drag and drop functionality.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-secondary/10 text-secondary flex items-center justify-center rounded-lg mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M18 11.5V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4" />
                  <path d="M14 10V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                  <path d="M10 9.9V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
                  <path d="M6 14v0a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2h-9.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Priority Flagging</h3>
              <p className="text-muted-foreground">Mark important tasks with priority flags to focus on what matters most.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-accent/30 text-accent-foreground flex items-center justify-center rounded-lg mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 15 15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Due Dates</h3>
              <p className="text-muted-foreground">Set and track due dates to ensure you never miss important deadlines.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 5v14" />
                <path d="M14 9h5" />
                <path d="M14 15h5" />
                <path d="M5 9h3" />
                <path d="M5 12h3" />
                <path d="M5 15h3" />
              </svg>
              <span className="font-semibold">Taskify</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Taskify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
