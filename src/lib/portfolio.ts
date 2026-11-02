import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'portfolio'>;

// By the approved order, drafts only in dev
export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('portfolio', ({ data }) => import.meta.env.DEV || !data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export function projectHref(project: Project): string | undefined {
  if (project.data.caseStudy) return `/portafolio/${project.id}`;
  return project.data.externalUrl;
}
