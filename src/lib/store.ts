"use client";

import type { Job, JobResponse, Worker } from "./types";

const JOBS_KEY = "sababa.jobs";
const WORKERS_KEY = "sababa.workers";
const RESPONSES_KEY = "sababa.responses";

function read<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, items: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("sababa:update", { detail: { key } }));
}

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function listJobs(): Job[] {
  return read<Job>(JOBS_KEY).sort((a, b) => b.createdAt - a.createdAt);
}
export function addJob(job: Omit<Job, "id" | "createdAt">): Job {
  const full: Job = { ...job, id: uid(), createdAt: Date.now() };
  const all = read<Job>(JOBS_KEY);
  all.push(full);
  write(JOBS_KEY, all);
  return full;
}

export function listWorkers(): Worker[] {
  return read<Worker>(WORKERS_KEY).sort((a, b) => b.createdAt - a.createdAt);
}
export function addWorker(worker: Omit<Worker, "id" | "createdAt">): Worker {
  const full: Worker = { ...worker, id: uid(), createdAt: Date.now() };
  const all = read<Worker>(WORKERS_KEY);
  all.push(full);
  write(WORKERS_KEY, all);
  return full;
}

export function listResponses(jobId?: string): JobResponse[] {
  const all = read<JobResponse>(RESPONSES_KEY).sort((a, b) => b.createdAt - a.createdAt);
  return jobId ? all.filter((r) => r.jobId === jobId) : all;
}
export function addResponse(r: Omit<JobResponse, "id" | "createdAt">): JobResponse {
  const full: JobResponse = { ...r, id: uid(), createdAt: Date.now() };
  const all = read<JobResponse>(RESPONSES_KEY);
  all.push(full);
  write(RESPONSES_KEY, all);
  return full;
}

export function subscribe(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener("sababa:update", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("sababa:update", handler);
    window.removeEventListener("storage", handler);
  };
}

export function seedIfEmpty() {
  if (typeof window === "undefined") return;
  if (read<Job>(JOBS_KEY).length === 0) {
    write<Job>(JOBS_KEY, [
      {
        id: uid(),
        title: "Deep cleaning of 3-room apartment",
        description:
          "One-time deep clean, ~90m², Tel Aviv center. Kitchen, bathrooms, windows.",
        category: "cleaning",
        city: "Tel Aviv",
        budget: 500,
        clientName: "Anna",
        contact: "+972 50 000 0001",
        createdAt: Date.now() - 1000 * 60 * 60 * 5,
      },
      {
        id: uid(),
        title: "Fix leaking kitchen faucet + hang two shelves",
        description: "Small handyman visit, tools required. Evenings preferred.",
        category: "handyman",
        city: "Haifa",
        budget: 250,
        clientName: "David",
        contact: "+972 52 000 0002",
        createdAt: Date.now() - 1000 * 60 * 60 * 20,
      },
      {
        id: uid(),
        title: "Move 1BR apartment across town",
        description: "Approx 20 boxes, sofa, bed, fridge. Ground floor to 3rd floor.",
        category: "moving",
        city: "Jerusalem",
        budget: 900,
        clientName: "Michael",
        contact: "+972 54 000 0003",
        createdAt: Date.now() - 1000 * 60 * 60 * 40,
      },
    ]);
  }
  if (read<Worker>(WORKERS_KEY).length === 0) {
    write<Worker>(WORKERS_KEY, [
      {
        id: uid(),
        name: "Maria K.",
        services: ["cleaning", "childcare"],
        city: "Tel Aviv",
        hourlyRate: 60,
        experience: 6,
        about: "Reliable, punctual. Deep cleans, weekly service, apartments and offices.",
        languages: "RU, EN, HE",
        contact: "+972 50 111 2233",
        email: "maria@example.com",
        createdAt: Date.now() - 1000 * 60 * 60 * 10,
      },
      {
        id: uid(),
        name: "Sergey P.",
        services: ["handyman", "construction"],
        city: "Haifa",
        hourlyRate: 120,
        experience: 12,
        about: "Handyman & renovations. Plumbing, electrical basics, furniture assembly.",
        languages: "RU, HE",
        contact: "+972 52 444 5566",
        email: "sergey@example.com",
        createdAt: Date.now() - 1000 * 60 * 60 * 30,
      },
    ]);
  }
}
