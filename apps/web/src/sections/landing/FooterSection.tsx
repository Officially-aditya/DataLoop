interface FooterSectionProps {
  onLaunchApp: () => void;
}

export function FooterSection({ onLaunchApp }: FooterSectionProps) {
  return (
    <footer className="landing-footer">
      <div className="landing-container landing-footer-inner">
        <div>
          <span className="landing-brand-mark" aria-hidden="true" />
          <strong>DataLoop</strong>
          <p>Decentralized data infrastructure for specialized AI agents.</p>
        </div>
        <button type="button" onClick={onLaunchApp}>
          Enter Workspace
        </button>
      </div>
    </footer>
  );
}
