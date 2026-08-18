export type CategoryKey =
  | "cleaning"
  | "handyman"
  | "construction"
  | "moving"
  | "gardening"
  | "childcare"
  | "other";

export const categoryKeys: CategoryKey[] = [
  "cleaning",
  "handyman",
  "construction",
  "moving",
  "gardening",
  "childcare",
  "other",
];

export type Job = {
  id: string;
  title: string;
  description: string;
  category: CategoryKey;
  city: string;
  budget: number | null;
  clientName: string;
  contact: string;
  createdAt: number;
};

export type Worker = {
  id: string;
  name: string;
  services: CategoryKey[];
  city: string;
  hourlyRate: number | null;
  experience: number | null;
  about: string;
  languages: string;
  contact: string;
  email: string;
  createdAt: number;
};

export type JobResponse = {
  id: string;
  jobId: string;
  workerName: string;
  contact: string;
  message: string;
  createdAt: number;
};
