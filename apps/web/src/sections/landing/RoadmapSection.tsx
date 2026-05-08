import { LandingButton } from "../../components/landing/LandingButton";
import { Reveal } from "../../components/landing/Reveal";
import { SectionHeading } from "../../components/landing/SectionHeading";

interface RoadmapSectionProps {
  onLaunchApp: () => void;
}

const roadmap = [
  ["Week 1", "On-chain task and correction records with local workspace flows."],
  ["MVP", "Dataset versioning, storage proof surfaces, and agent artifact marketplace."],
  ["Next", "Consensus scoring, automated training triggers, and buyer SDK packaging."],
  ["Scale", "Multi-domain agent datasets with reputation-weighted expert networks."]
];

export function RoadmapSection({ onLaunchApp }: RoadmapSectionProps) {
  return (
    <section className="landing-section landing-roadmap-section" id="roadmap">
      <div className="landing-container">
        <Reveal>
          <SectionHeading
            kicker="Roadmap"
            title="From working dashboard to data layer for the agentic economy"
            copy="The landing narrative now sits in front of the product, while the existing dashboard remains the execution layer behind every CTA."
          />
        </Reveal>
        <div className="landing-roadmap">
          {roadmap.map(([phase, copy], index) => (
            <Reveal className="landing-roadmap-item" delay={index < 2 ? "short" : "medium"} key={phase}>
              <span>{phase}</span>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="landing-final-cta">
          <h3>Ready to inspect the live workspace?</h3>
          <LandingButton variant="primary" onClick={onLaunchApp}>
            Launch App
          </LandingButton>
        </Reveal>
      </div>
    </section>
  );
}
