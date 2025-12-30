import Container from "@/components/common/container";
import AllAttempTedQuiz from "@/components/quiz/all-attempted-quiz";
import Announcement from "@/components/quiz/anouncement";
import RecentQuiz from "@/components/quiz/recent-quiz";
import Summary from "@/components/quiz/summary";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function page() {
  return (
    <Container className=" space-y-5">
      <div className="grid grid-cols-4 my-4 gap-4">
        <RecentQuiz />
        <Announcement />
      </div>
      <div>
        <Summary />
      </div>
      <Card>
        <CardHeader className="text-xl font-semibold">Check All Your Quiz</CardHeader>
        <CardContent>
          <AllAttempTedQuiz />
        </CardContent>
      </Card>
    </Container>
  );
}
