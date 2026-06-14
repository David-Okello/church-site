import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
  style,
  white,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  white?: boolean;
}) {
  return (
    <div className={`${white ? "card-white" : "card"} ${className}`} style={style}>
      {children}
    </div>
  );
}
