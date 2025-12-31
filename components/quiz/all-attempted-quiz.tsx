import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function AllAttempTedQuiz() {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-5">
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
            <Button>Continue</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
