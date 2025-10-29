import * as React from "react";

interface AvatarProps {
  src?: string | null;
  alt: string;
  fallbackText: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-lg",
  lg: "h-12 w-12 text-xl",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallbackText,
  size = "md",
  className = "",
}) => {
  const sizeClass = sizeClasses[size];

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeClass} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full bg-gray-200 flex items-center justify-center ${className}`}
    >
      <span className="font-semibold">{fallbackText}</span>
    </div>
  );
};
