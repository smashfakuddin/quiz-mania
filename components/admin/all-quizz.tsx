import { DeleteIcon, EditIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

export default function AllQuiz() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Card className="hover:scale-[1.02] transition-all duration-300">
        <div className="flex gap-4">
          <img src="/image/404-computer.svg" alt="" className="w-52 shrink-0" />
          <div className="flex flex-col gap-3 min-w-0 flex-1">
            <div className="flex justify-between items-center">
              <Badge variant={"destructive"}>Draft</Badge>
              <Button
                variant="secondary"
                size="icon"
                className="shrink mr-1 cursor-pointer"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-start justify-between gap-3 min-w-0">
              <h3 className="text-lg md:text-xl font-semibold wrap-break-word flex-1">
                Lorem, ipsum dolor sit amet consectetur Lorem
              </h3>
            </div>

            <p className="text-sm text-muted-foreground">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, beatae?
            </p>

            <Button className="w-fit">
              Continue Editing <EditIcon />
            </Button>
          </div>
        </div>
      </Card>
      <Card className="hover:scale-[1.02] transition-all duration-300">
        <div className="flex gap-4">
          <img src="/image/404-computer.svg" alt="" className="w-52 shrink-0" />
          <div className="flex flex-col gap-3 min-w-0 flex-1">
            <div className="flex justify-between items-center">
              <Badge>Published</Badge>
              <Button
                variant="secondary"
                size="icon"
                className="shrink mr-1 cursor-pointer"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-start justify-between gap-3 min-w-0">
              <h3 className="text-lg md:text-xl font-semibold wrap-break-word flex-1">
                Lorem, ipsum dolor sit amet consectetur Lorem
              </h3>
            </div>

            <p className="text-sm text-muted-foreground">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, beatae?
            </p>

            <Button className="w-fit">
              Continue Editing <EditIcon />
            </Button>
          </div>
        </div>
      </Card>
      <Card className="hover:scale-[1.02] transition-all duration-300">
        <div className="flex gap-4">
          <img src="/image/404-computer.svg" alt="" className="w-52 shrink-0" />
          <div className="flex flex-col gap-3 min-w-0 flex-1">
            <div className="flex justify-between items-center">
              <Badge>Published</Badge>
              <Button
                variant="secondary"
                size="icon"
                className="shrink mr-1 cursor-pointer"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-start justify-between gap-3 min-w-0">
              <h3 className="text-lg md:text-xl font-semibold wrap-break-word flex-1">
                Lorem, ipsum dolor sit amet consectetur Lorem
              </h3>
            </div>

            <p className="text-sm text-muted-foreground">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, beatae?
            </p>

            <Button className="w-fit">
              Continue Editing <EditIcon />
            </Button>
          </div>
        </div>
      </Card>
      <Card className="hover:scale-[1.02] transition-all duration-300">
        <div className="flex gap-4">
          <img src="/image/404-computer.svg" alt="" className="w-52 shrink-0" />
          <div className="flex flex-col gap-3 min-w-0 flex-1">
            <div className="flex justify-between items-center">
              <Badge variant={"destructive"}>Draft</Badge>
              <Button
                variant="secondary"
                size="icon"
                className="shrink mr-1 cursor-pointer"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-start justify-between gap-3 min-w-0">
              <h3 className="text-lg md:text-xl font-semibold wrap-break-word flex-1">
                Lorem, ipsum dolor sit amet consectetur Lorem
              </h3>
            </div>

            <p className="text-sm text-muted-foreground">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, beatae?
            </p>

            <Button className="w-fit">
              Continue Editing <EditIcon />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
