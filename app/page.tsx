import { auth } from "@/auth";
import Container from "@/components/common/container";
import { Feature } from "@/components/common/features";
import { Hero } from "@/components/common/hero";
import Trending from "@/components/common/trending";


export default async function Page() {
  const session = await auth();
  console.log("login session",session)
  return (
    <Container>
      <Hero />
      <Trending/>
      <Feature />
    </Container>
  );
}
