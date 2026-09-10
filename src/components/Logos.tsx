/* Brand logo components — three variants from the Performance Meals Brand Guide */

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark" | "yellow";
  className?: string;
}

// ── Parent Brand: Performance Meals ──────────────────────────
// Yellow circle mark + "PERFORMANCE" wordmark with underline + "MEALS" subscript
export function PerformanceMealsLogo({ size = "md", variant = "dark", className = "" }: LogoProps) {
  const scales = { sm: 0.65, md: 1, lg: 1.3 };
  const s = scales[size];
  const textColor = variant === "dark" ? "#1A1A1A" : variant === "yellow" ? "#1A1A1A" : "#FFFFFF";
  const circleColor = variant === "yellow" ? "#1A1A1A" : "#F5B300";
  const lineColor = "#F5B300";

  return (
    <div className={`inline-flex items-center gap-[10px] select-none ${className}`} style={{ transform: `scale(${s})`, transformOrigin: "left center" }}>
      {/* Circle mark */}
      <div className="shrink-0 w-[34px] h-[34px] rounded-full flex-shrink-0" style={{ backgroundColor: circleColor }} />
      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: "17px",
            letterSpacing: "0.18em",
            color: textColor,
            lineHeight: 1,
          }}
        >
          PERFORMANCE
        </span>
        {/* Golden underline */}
        <div className="my-[3px]" style={{ height: "1.5px", backgroundColor: lineColor }} />
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 400,
            fontSize: "9px",
            letterSpacing: "0.35em",
            color: textColor,
            opacity: 0.7,
            lineHeight: 1,
          }}
        >
          MEALS
        </span>
      </div>
    </div>
  );
}

// ── Meal Plan sub-brand ───────────────────────────────────────
// "PERFORMANCE MEALS" micro-label + left orange bar + italic bold "MEAL PLAN"
export function MealPlanLogo({ size = "md", variant = "light", className = "" }: LogoProps) {
  const scales = { sm: 0.65, md: 1, lg: 1.3 };
  const s = scales[size];
  const textColor = variant === "dark" ? "#FFFFFF" : "#1A1A1A";
  const orange = "#E85D04";

  return (
    <div className={`inline-flex items-start gap-[10px] select-none ${className}`} style={{ transform: `scale(${s})`, transformOrigin: "left center" }}>
      {/* Orange left bar */}
      <div className="shrink-0 mt-[3px]" style={{ width: "4px", backgroundColor: orange, alignSelf: "stretch", minHeight: "38px" }} />
      <div className="flex flex-col leading-none">
        {/* "PERFORMANCE MEALS" micro-label */}
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: "8px",
            letterSpacing: "0.25em",
            color: orange,
            lineHeight: 1,
            marginBottom: "4px",
          }}
        >
          PERFORMANCE MEALS
        </span>
        {/* Big italic "MEAL PLAN" */}
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: "28px",
            letterSpacing: "-0.01em",
            color: textColor,
            lineHeight: 0.9,
          }}
        >
          MEAL PLAN
        </span>
        {/* Orange brushstroke underline */}
        <svg width="110" height="7" viewBox="0 0 110 7" style={{ marginTop: "3px" }}>
          <path d="M2 4.5 C20 2, 55 5.5, 80 3.5 C95 2.5, 105 4, 108 4.5"
            stroke={orange} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        </svg>
      </div>
    </div>
  );
}

// ── Ready-Series sub-brand ────────────────────────────────────
// Yellow circle + bold "READY-SERIES" + "by PERFORMANCE MEALS" subscript
export function ReadySeriesLogo({ size = "md", variant = "dark", className = "" }: LogoProps) {
  const scales = { sm: 0.65, md: 1, lg: 1.3 };
  const s = scales[size];
  const textColor = variant === "light" ? "#1A1A1A" : variant === "yellow" ? "#1A1A1A" : "#FFFFFF";
  const circleColor = variant === "yellow" ? "#1A1A1A" : "#F5B300";

  return (
    <div className={`inline-flex items-center gap-[10px] select-none ${className}`} style={{ transform: `scale(${s})`, transformOrigin: "left center" }}>
      {/* Circle mark */}
      <div className="shrink-0 w-[32px] h-[32px] rounded-full" style={{ backgroundColor: circleColor }} />
      <div className="flex flex-col leading-none">
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: "19px",
            letterSpacing: "0.04em",
            color: textColor,
            lineHeight: 1,
          }}
        >
          READY-SERIES
        </span>
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 400,
            fontSize: "8px",
            letterSpacing: "0.2em",
            color: textColor,
            opacity: 0.5,
            lineHeight: 1,
            marginTop: "3px",
          }}
        >
          by PERFORMANCE MEALS
        </span>
      </div>
    </div>
  );
}
