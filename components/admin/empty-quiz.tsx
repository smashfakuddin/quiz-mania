import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

export function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">{/* <IconFolderCode /> */}</EmptyMedia>
        <EmptyTitle>No Quiz Created Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any Quizzes yet. Get started by creating your
          first Quiz.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Link href={"/quiz/create"}>
            <Button>Create Quiz <ArrowRightIcon/></Button>
          </Link>
        </div>
      </EmptyContent>
    </Empty>
  );
}
