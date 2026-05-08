import { Reveal } from "../../components/landing/Reveal";
import { SectionHeading } from "../../components/landing/SectionHeading";

const architectureCards = [
  {
    title: "0G Storage",
    label: "Versioning",
    copy: "Every label and dataset version is represented as an immutable storage object with a root hash anchored to platform records."
  },
  {
    title: "0G Chain",
    label: "Contracts",
    copy: "Task creation, correction submission, and dataset registration flow through low-cost smart contract primitives."
  },
  {
    title: "0G Compute",
    label: "Fine-tuning",
    copy: "High-consensus dataset versions can trigger model update jobs and attach resulting model hashes to the data lineage."
  },
  {
    title: "Agent ID",
    label: "Reputation",
    copy: "Expert identity and historical consensus quality become part of the economic security model for labels."
  }
];

export function ArchitectureSection() {
  return (
    <section className="landing-section" id="architecture">
      <div className="landing-container">
        <Reveal>
          <SectionHeading
            kicker="Architecture"
            title="Every infrastructure layer is load-bearing"
            copy="The Stitch export's architecture story has been converted into responsive React sections that mirror the working dashboard: tasks, datasets, storage proofs, and agent artifacts."
          />
        </Reveal>

        <Reveal className="landing-architecture-map">
          <h3>System overview</h3>
          <pre>
{`React Workspace       <->  API Service       <->  0G Chain
Task + Label Store    ->   0G Storage      ->   Dataset Versions
Consensus Engine      ->   0G Compute      ->   Improved Agent`}
          </pre>
          <div className="landing-tech-strip">
            <span>React + Vite</span>
            <span>Solidity contracts</span>
            <span>0G Storage SDK</span>
            <span>Agent artifact library</span>
          </div>
        </Reveal>

        <div className="landing-architecture-grid">
          {architectureCards.map((card, index) => (
            <Reveal className="landing-architecture-card" delay={index % 2 === 0 ? "short" : "medium"} key={card.title}>
              <p className="landing-kicker">{card.label}</p>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
