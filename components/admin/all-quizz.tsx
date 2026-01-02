import { DeleteIcon, EditIcon, TrashIcon, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { EmptyDemo } from "./empty-quiz";
import { toast } from "sonner";
import DeleteQuiz from "./delete-quiz";
import { revalidatePath } from "next/cache";
import EditQuiz from "./create/edit-quiz";
import Link from "next/link";

export default async function AllQuiz() {
  const res = await fetch("http://localhost:3000/api/quiz", {
    next: { tags: ["quizzes"] },
  });
  const quizzes = await res.json();

  const handleDeleteQuiz = async (id: string) => {
    "use server";
    try {
      const res = await fetch("http://localhost:3000/api/quiz", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        throw new Error("Unable To Delete");
      }

      const response = await res.json();
      revalidatePath("/admin");
      toast.warning(response.message);
    } catch (error: any) {
      // toast.error(error?.message);
      console.log(error);
    }
  };
  return quizzes.data.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {quizzes.data.map((quiz: any) => (
        <Card
          className="hover:scale-[1.02] transition-all duration-300"
          key={quiz._id}
        >
          <div className="flex gap-4">
            <img
              src="/image/404-computer.svg"
              alt=""
              className="w-52 shrink-0"
            />
            <div className="flex flex-col gap-3 min-w-0 flex-1">
              <div className="flex justify-between items-center">
                <Badge variant={"destructive"}>Draft</Badge>
                <div className="flex items-center gap-1">
                  <EditQuiz
                    isEdit={true}
                    title={quiz.title}
                    description={quiz.description}
                    id={quiz._id.toString()}
                  />
                  <DeleteQuiz
                    id={quiz._id.toString()}
                    handleDeleteQuiz={handleDeleteQuiz}
                  />
                </div>
              </div>

              <div className="flex items-start justify-between gap-3 min-w-0">
                <h3 className="text-lg md:text-xl font-semibold wrap-break-word flex-1">
                  {quiz.title}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground">
                {quiz.description}
              </p>

              <div className="space-x-2">
                <Link href={`/quiz/create-edit/${quiz._id.toString()}`} >
                  <Button className="w-fit cursor-pointer" >
                    Continue Editing <EditIcon />
                  </Button>
                </Link>
                <Button className="w-fit" variant={"secondary"}>
                  Publish <Upload />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  ) : (
    <Card className="flex items-center justify-center">
      <EmptyDemo />
    </Card>
  );
}
