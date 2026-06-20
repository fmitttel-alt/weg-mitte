"use client";

interface Props {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export default function SurlyHeading({ children, className = "", as: Tag = "h1" }: Props) {
  return (
    <Tag className={`font-surly uppercase ${className}`}>
      {children}
    </Tag>
  );
}
