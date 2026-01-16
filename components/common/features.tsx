import {
  Sparkle,
  ChartBar,
  Calendar,
  ListChecks,
  CloudLightning,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature {
  heading: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureProps {
  title?: string;
  features?: Feature[];
  buttonText?: string;
  buttonUrl?: string;
  className?: string;
}

const features = [
  {
    heading: "Role-Based Access",
    description:
      "Teachers and students have separate logins and permissions. Secure access ensures that each user sees only what they are allowed to.",
    icon: <ShieldCheck className="size-6" />,
  },
  {
    heading: "Quiz Management",
    description:
      "Teachers can create, edit, and publish quizzes with ease. Questions can be added individually, and quizzes can be toggled between published and unpublished states.",
    icon: <ListChecks className="size-6" />,
  },
  {
    heading: "Student Performance",
    description:
      "Students can attempt quizzes and instantly see a detailed performance summary including correct/incorrect answers, accuracy, and all-time performance charts.",
    icon: <ChartBar className="size-6" />,
  },
  {
    heading: "Analytics & Insights",
    description:
      "Track overall progress with line charts, performance summaries, and history of all attempted quizzes. Helps students and teachers monitor improvement over time.",
    icon: <CloudLightning className="size-6" />,
  },
  {
    heading: "Organized Scheduling",
    description:
      "Teachers can manage quizzes per course or semester, and students can see upcoming quizzes. Supports efficient course planning and tracking.",
    icon: <Calendar className="size-6" />,
  },
  {
    heading: "Efficiency & Scalability",
    description:
      "Pagination and optimized queries ensure smooth performance for large quiz sets and many students, keeping the app fast and responsive.",
    icon: <Sparkle className="size-6" />,
  },
];

const Feature = ({
  title = "Full-Stack Quiz Platform with Analytics and Role-Based Access",
  className,
}: FeatureProps) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        {title && (
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-2xl text-pretty lg:text-4xl font-semibold">
              {title}
            </h2>
          </div>
        )}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.heading}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature };
