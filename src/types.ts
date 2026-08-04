export interface Instructor {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface SocialLinks {
  telegram: string;
  instagram: string;
  github: string;
}

export interface WebinarConfig {
  webinarTitle: string;
  subtitle: string;
  description: string;
  instructor: Instructor;
  webinarDate: string; // ISO date string
  socialLinks: SocialLinks;
  logoUrl: string;
  jitsiRoomName: string;
  jitsiDomain: string;
  giftMessage: string;
  registrationUrl?: string;
}

export interface Registration {
  id: string;
  name: string;
  phone: string;
  email?: string;
  registrationDate: string;
  giftSent?: boolean;
  giftSentAt?: string;
  giftNotes?: string;
}

export type TabType = 'landing' | 'live';

export interface WebinarTopic {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag: string;
}
