import type { PlanTab } from "@/types/fitlog";

interface PlanTabsProps {
  activeTab: PlanTab;
  onChange: (tab: PlanTab) => void;
}

export default function PlanTabs({ activeTab, onChange }: PlanTabsProps) {
  return (
    <div aria-label="Plan lists" className="plan-tabs" role="tablist">
      <button aria-selected={activeTab === "plan"} className="plan-tab" onClick={() => onChange("plan")} role="tab" type="button">
        Today&apos;s Plan
      </button>
      <button aria-selected={activeTab === "saved"} className="plan-tab" onClick={() => onChange("saved")} role="tab" type="button">
        Saved
      </button>
    </div>
  );
}
