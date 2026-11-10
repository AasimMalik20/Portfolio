import { HeroSection } from '@/components/sections/HeroSection';
import { PostsSection } from '@/components/sections/PostsSection';
import { HomeClient } from '@/components/HomeClient';

export default function Home() {
  return (
    <HomeClient
      hero={<HeroSection />}
      posts={<PostsSection />}
    />
  );
}
