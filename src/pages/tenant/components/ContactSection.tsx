import { Facebook, Instagram, Twitter, Linkedin, Globe } from "lucide-react";

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

interface ContactSectionProps {
  socialLinks: SocialLinks;
}

export default function ContactSection({ socialLinks }: ContactSectionProps) {
  const socials = [
    {
      name: "Facebook",
      icon: Facebook,
      url: socialLinks.facebook,
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: socialLinks.instagram,
      color: "hover:text-pink-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: socialLinks.twitter,
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: socialLinks.linkedin,
      color: "hover:text-blue-700",
    },
    {
      name: "Website",
      icon: Globe,
      url: socialLinks.website,
      color: "hover:text-green-600",
    },
  ].filter((social) => social.url);

  if (socials.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex flex-wrap justify-center gap-6">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all hover:scale-110 ${social.color}`}
              aria-label={social.name}
            >
              <Icon className="w-10 h-10" />
              <span className="text-sm font-medium text-gray-700">
                {social.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
