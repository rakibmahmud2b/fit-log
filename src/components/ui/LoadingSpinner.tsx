export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div aria-live="polite" className="loading-state" role="status">
      <span aria-hidden="true" className="loading-ring" />
      <span>{label}</span>
    </div>
  );
}
