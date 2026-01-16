import { auth } from "@/auth";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { getLastAttemptedQuiz } from "@/lib/mongo-query";

export default async function RecentQuiz() {
  const session = await auth();
    if(!session?.user){
      return <>not auth</>
    }
    const data = await getLastAttemptedQuiz(session?.user?.id);
  return (
    <div className="col-span-4 md:col-span-3 gap-3 flex flex-col">
      <Card className=" hover:scale-[102%] transition-all duration-300 h-full">
        <div className="flex w-full">
          <div>
            <img src="/image/404-computer.svg" alt="" className="w-52" />
          </div>
          <div className=" space-y-3 w-full">
            <h3 className="text-2xl font-semibold">
              {data?.title}
            </h3>
            <p>
              {data.description}
            </p>
            <Progress className="h-2.5" value={80} />
            <Button>Continue</Button>
          </div>
        </div>
      </Card>
     
      
    </div>
  );
}
