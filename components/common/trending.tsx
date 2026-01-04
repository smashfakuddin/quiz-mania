import { getAllQuiz } from "@/lib/mongo-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowRight } from "lucide-react";

export default async function Trending() {
  const res = await getAllQuiz();
  const quizzes = await res.json();
  console.log(quizzes);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Explore All Published Quiz
          </CardTitle>
        </CardHeader>
        <CardContent>
          {quizzes?.data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {quizzes.data.map((quiz: any) => (
                <Card
                  key={quiz._id}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex gap-4 p-5">
                    {/* Thumbnail */}
                    <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-muted shrink-0">
                      <img
                        src="/image/404-computer.svg"
                        alt="Quiz"
                        className="w-10 h-10"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-3 flex-1 min-w-0">
                      {/* Status */}
                      <div className="flex justify-between items-center">
                        <Badge variant="destructive" className="text-xs">
                          Draft
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold leading-tight truncate">
                        {quiz.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {quiz.description}
                      </p>

                      {/* Action */}
                      <div className="pt-2">
                        <Link href={`/attempt/${quiz._id.toString()}`}>
                          <Button
                            size="sm"
                            className="group-hover:translate-x-0.5 transition-transform"
                          >
                            Start Quiz <ArrowRight />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center text-muted-foreground">
              No quizzes found.
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
