import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";

export default function RecentQuiz() {
  return (
    <div className="col-span-4 md:col-span-3 gap-3 flex flex-col">
      <Card className=" hover:scale-[102%] transition-all duration-300">
        <div className="flex">
          <div>
            <img src="/image/404-computer.svg" alt="" className="w-52" />
          </div>
          <div className=" space-y-3">
            <h3 className="text-2xl font-semibold">
              Lorem, ipsum dolor sit amet consectetur
            </h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, beatae?
            </p>
            <Progress className="h-2.5" value={80} />
            <Button>Continue</Button>
          </div>
        </div>
      </Card>
      <Card className=" hover:scale-[102%] transition-all duration-300">
        <div className="flex">
          <div>
            <img src="/image/404-computer.svg" alt="" className="w-52" />
          </div>
          <div className=" space-y-3">
            <h3 className="text-2xl font-semibold">
              Lorem, ipsum dolor sit amet consectetur
            </h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, beatae?
            </p>
            <Progress className="h-2.5" value={80} />
            <Button>Continue</Button>
          </div>
        </div>
      </Card>
      
    </div>
  );
}
