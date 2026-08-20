type IconProps = { className?: string };

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.35C16.2 4.31 15.2 4.22 14 4.22c-2.37 0-4 1.45-4 4.1V10.5H7.5v3h2.5V21h3.5Z" />
    </svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.6c-.24-1-1-1.76-2-2C17.9 5.2 12 5.2 12 5.2s-5.9 0-7.6.4c-1 .24-1.76 1-2 2C2 9.3 2 12 2 12s0 2.7.4 4.4c.24 1 1 1.76 2 2 1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4c1-.24 1.76-1 2-2 .4-1.7.4-4.4.4-4.4s0-2.7-.4-4.4ZM10 15.2V8.8L15.8 12 10 15.2Z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.9 10.9 20.3 3.5h-1.9l-5.5 6.4-4.4-6.4H3l6.8 9.9L3 20.5h1.9l5.8-6.8 4.6 6.8H21l-7.1-9.6Zm-2 2.4-.7-1L5.9 4.9h2l4.3 6.2.7 1 5.6 8h-2l-4.6-6.6Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.5 14.4c-.3-.15-1.7-.85-2-.95-.27-.1-.46-.15-.66.15-.2.3-.75.95-.92 1.14-.17.2-.34.22-.63.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.73-1.63-2.03-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.2-.24-.57-.48-.5-.66-.5-.17 0-.37-.03-.56-.03-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.56.72.3 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.7-.7 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.2-.55-.34Z" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.47 3.5 1.36 5L2 22l5.15-1.35A9.96 9.96 0 0 0 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2Zm0 18.2c-1.6 0-3.15-.43-4.5-1.24l-.32-.19-3.06.8.82-2.98-.2-.31A8.2 8.2 0 0 1 3.8 12c0-4.53 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.68 8.2-8.2 8.2Z" />
    </svg>
  );
}

const iconFor = (label: string) => {
  if (label === "Facebook") return FacebookIcon;
  if (label === "YouTube") return YouTubeIcon;
  if (label === "X (Twitter)" || label === "X") return XIcon;
  return null;
};

export function SocialIconLink({
  href,
  label,
  variant = "dark",
}: {
  href: string;
  label: string;
  variant?: "dark" | "light";
}) {
  const Icon = iconFor(label);
  const dark = variant === "dark";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="w-9 h-9 rounded-full grid place-items-center transition-colors"
      style={{
        background: dark ? "rgba(255,255,255,0.08)" : "#EDE8DE",
        color: dark ? "#ffffff" : "#1C1814",
      }}
    >
      {Icon ? <Icon className="w-4 h-4" /> : <span className="text-xs font-semibold">{label}</span>}
    </a>
  );
}
