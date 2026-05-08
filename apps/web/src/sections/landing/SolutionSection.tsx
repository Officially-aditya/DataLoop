import { LandingButton } from "../../components/landing/LandingButton";
import { Reveal } from "../../components/landing/Reveal";
import { SectionHeading } from "../../components/landing/SectionHeading";

interface SolutionSectionProps {
  onLaunchApp: () => void;
}

const participants = [
  {
    title: "Agent Developers",
    copy: "Post labeling tasks with token bounties and define what correct output looks like for specific domain failures."
  },
  {
    title: "Domain Experts",
    copy: "Stake to participate, submit corrected input-output pairs, and earn when labels reach consensus."
  },
  {
    title: "Dataset Buyers",
    copy: "Buy versioned dataset snapshots with provenance, quality scores, and reusable artifact context."
  }
];

const flywheelSteps = ["Mistake", "Post Task", "Consensus", "Storage", "Fine-tune"];

export function SolutionSection({ onLaunchApp }: SolutionSectionProps) {
  return (
    <section className="landing-section landing-section-band" id="solution">
      <div className="landing-container">
        <Reveal>
          <SectionHeading
            kicker="The DataLoop Protocol"
            title="A market loop for production agent improvement"
            copy="The platform connects task creators, expert labelers, storage proofs, and reusable agent artifacts in a single workspace."
          />
        </Reveal>

        <div className="landing-role-grid">
          {participants.map((participant, index) => (
            <Reveal className="landing-role-card" delay={index === 0 ? "none" : index === 1 ? "short" : "medium"} key={participant.title}>
              <span className="landing-role-index">0{index + 1}</span>
              <h3>{participant.title}</h3>
              <p>{participant.copy}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="landing-flywheel">
          <div className="landing-flywheel-header">
            <div>
              <p className="landing-kicker">Improvement Flywheel</p>
              <h3>Every correction becomes structured learning material.</h3>
            </div>
            <LandingButton variant="primary" onClick={onLaunchApp}>
              Enter Workspace
            </LandingButton>
          </div>
          <div className="landing-flywheel-steps">
            {flywheelSteps.map((step, index) => (
              <div className="landing-flywheel-step" key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
