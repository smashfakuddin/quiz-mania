import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function Announcement() {
  return (
    <div className="col-span-4 md:col-span-1">
      <Card className="h-full">
        <div className=" space-y-3 p-3">
          <h3 className="text-2xl font-semibold">
            Lorem, ipsum dolor sit amet consectetur
          </h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem, beatae?
          </p>

          <Button>Continue</Button>
        </div>
      </Card>
    </div>
  );
}
