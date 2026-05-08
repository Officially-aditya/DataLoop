import { ArchitectureSection } from "../sections/landing/ArchitectureSection";
import { DemoSection } from "../sections/landing/DemoSection";
import { FooterSection } from "../sections/landing/FooterSection";
import { HeroSection } from "../sections/landing/HeroSection";
import { MarketResearchSection } from "../sections/landing/MarketResearchSection";
import { ProblemSection } from "../sections/landing/ProblemSection";
import { RoadmapSection } from "../sections/landing/RoadmapSection";
import { SolutionSection } from "../sections/landing/SolutionSection";

interface LandingPageProps {
  onLaunchApp: () => void;
}

const navigationItems = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Architecture", href: "#architecture" },
  { label: "Demo", href: "#demo" },
  { label: "Market", href: "#market" },
  { label: "Roadmap", href: "#roadmap" }
];

export function LandingPage({ onLaunchApp }: LandingPageProps) {
  return (
    <div className="landing-page">
      <div className="landing-noise" aria-hidden="true" />
      <header className="landing-nav">
        <a className="landing-brand" href="#home" aria-label="DataLoop home">
          <span className="landing-brand-mark" aria-hidden="true" />
          <span>DataLoop</span>
        </a>
        <nav aria-label="Landing sections">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <button className="landing-nav-cta" type="button" onClick={onLaunchApp}>
          Launch App
        </button>
      </header>
      <main>
        <HeroSection onLaunchApp={onLaunchApp} />
        <ProblemSection />
        <SolutionSection onLaunchApp={onLaunchApp} />
        <ArchitectureSection />
        <DemoSection onLaunchApp={onLaunchApp} />
        <MarketResearchSection />
        <RoadmapSection onLaunchApp={onLaunchApp} />
      </main>
      <FooterSection onLaunchApp={onLaunchApp} />
    </div>
  );
}
