import { useEffect, useState } from "react";
import { useLocation } from "react-router";

/** Top progress bar + scroll reset on every client-side navigation. */
export function RouteProgress() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setComplete(false);
    setVisible(true);

    const done = window.setTimeout(() => setComplete(true), 280);
    const hide = window.setTimeout(() => setVisible(false), 520);
    return () => {
      window.clearTimeout(done);
      window.clearTimeout(hide);
    };
  }, [location.pathname, location.search]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] overflow-hidden"
      aria-hidden
    >
      <div
        className={`h-full origin-left bg-[linear-gradient(90deg,var(--kree-blue,#0c6e9a),var(--kree-orange,#ffb347))] shadow-[0_0_12px_rgba(255,179,71,0.55)] transition-[transform,opacity] duration-300 ease-out ${
          complete ? "scale-x-100 opacity-0" : "scale-x-[0.72] opacity-100"
        }`}
        style={{ transformOrigin: "left center" }}
      />
    </div>
  );
}
