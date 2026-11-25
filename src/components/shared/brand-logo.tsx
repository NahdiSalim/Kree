import { cn } from "@/utils";

const LOGO_SRC = "/images/logo/tunisrent.png";

type BrandLogoProps = {
  className?: string;
  /** Full wordmark vs cropped mark (sidebar collapsed / tight spaces). */
  markOnly?: boolean;
  /** Soft light halo so the mark stays readable on dark surfaces. */
  onDark?: boolean;
  /** Soft white backlight behind the mark. */
  glow?: boolean;
};

export function BrandLogo({
  className,
  markOnly = false,
  onDark = false,
  glow = true,
}: BrandLogoProps) {
  if (markOnly) {
    return (
      <span
        className={cn(
          "relative inline-flex size-12 shrink-0 overflow-hidden rounded-2xl",
          className,
        )}
      >
        {glow && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-[-20%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.55)_40%,transparent_72%)] blur-[6px]"
          />
        )}
        <img
          src={LOGO_SRC}
          alt=""
          className="relative z-10 h-full w-auto max-w-none object-cover object-left"
        />
      </span>
    );
  }

  return (
    <span className={cn("relative inline-flex items-center", className)}>
      {glow && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 z-0 h-[120%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full",
            "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.7)_35%,rgba(255,255,255,0.25)_58%,transparent_75%)]",
            "blur-[10px]",
            onDark && "h-[135%] w-[125%] blur-[12px]",
          )}
        />
      )}
      <img
        src={LOGO_SRC}
        alt="TunisRent"
        className={cn(
          "relative z-10 h-full w-auto object-contain object-left",
          onDark && "drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]",
        )}
      />
    </span>
  );
}
