import { DeleteIcon, TrashIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import DeleteQuestion from "./delete-question";

export default async function AllQuestions({ quizId }: { quizId: string }) {
  const res = await fetch(`http://localhost:3000/api/quiz/${quizId}`);
  const data = await res.json();

  if (!data) {
    return <div>Not Found</div>;
  }

  const { data: quiz } = data;
  console.log(quiz);
  return (
    <div>
      <Card className="p-3 grid grid-cols-2 ">
        {quiz?.questions?.map((que: any, idx: number) => (
          <Card
            className="hover:scale-[1.02] transition-all duration-300"
            key={quiz._id}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <p>
                  {" "}
                  {idx + 1}. {que.questionText}
                </p>
                <DeleteQuestion id={que._id} quizId={quizId}/>
              </CardTitle>
              {que.note && <h3 className="ml-3 italic">Note: {que.note}</h3>}
            </CardHeader>
            <CardContent>
              <ul className="grid grid-col-2 ml-5">
                {que?.options.map((opt: string, idx: number) => (
                  <li>
                    {String.fromCharCode(97 + idx)}. {opt}
                  </li>
                ))}
              </ul>
              <p className="mt-3">Correct Answer: {que.correctAnswer}</p>
            </CardContent>
          </Card>
        ))}
      </Card>
    </div>
  );
}
