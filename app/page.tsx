import Container from "@/components/common/container";
import { Feature } from "@/components/common/features";
import { Hero } from "@/components/common/hero";
import { Trending } from "@/components/common/tranding";

export default function Page() {
  return (
    <Container>
      <Hero />
      <Trending className="min-w-full w-full" />
      <Feature />
    </Container>
  );
}
