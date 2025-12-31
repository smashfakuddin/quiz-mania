import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TrendingUp } from "lucide-react";

type SummaryCardProps = {
  title: string;
  amount: number;
  link: string;
};

export default function SummaryCard({ title, amount, link }: SummaryCardProps) {
  return (
    <div className="w-full ">
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl font-semibold  text-muted-foreground">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-3xl font-bold">{amount}</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Link href={link}>
            <Button variant="ghost" size="sm">
              View all quizzes <TrendingUp/>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
