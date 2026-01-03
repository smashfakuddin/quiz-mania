import Container from "@/components/common/container";
import { Feature } from "@/components/common/features";
import { Hero } from "@/components/common/hero";
import Trending from "@/components/common/trending";


export default function Page() {
  return (
    <Container>
      <Hero />
      <Trending/>
      <Feature />
    </Container>
  );
}
