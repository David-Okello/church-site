import { ReactNode } from "react";

export default function GlassCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-3xl glass ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
