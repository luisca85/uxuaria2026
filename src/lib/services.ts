// The four service pages, in the order of the home list and the Servicios menu (spec 16-servicios-ia)
export interface Service {
  id: 'diagnostico' | 'design-system' | 'ai-native' | 'rescue';
  name: string;
  summary: string;
  // Extra line for the card on /servicios/ only (spec 17)
  description?: string;
  // Label for the "Otros servicios" rows on the service pages
  link: string;
  href: string;
}

export const SERVICES: Service[] = [
  {
    id: 'diagnostico',
    name: 'Diagnóstico UX',
    summary: 'Descubre qué está frenando a tus usuarios.',
    link: 'Diagnóstico UX gratis para tu producto',
    href: '/servicios/investigacion/',
  },
  {
    id: 'design-system',
    name: 'Design System AI Ready',
    summary: 'Marca, diseño y código en un solo sistema.',
    link: 'Design System AI Ready para tu marca',
    href: '/servicios/design-systems-ia/',
  },
  {
    id: 'ai-native',
    name: 'Diseño de experiencia AI Native',
    summary: 'Diseño de producto con IA en cada etapa del proceso.',
    description: 'Amplifica el alcance y acelera el desarrollo de tu producto con un sistema que usa IA donde realmente aporta y criterio humano donde hay que decidir.',
    link: 'Diseño de experiencia AI Native',
    href: '/servicios/diseno-ai-native/',
  },
  {
    id: 'rescue',
    name: 'AI MVP Rescue',
    summary: 'Convierte tu prototipo hecho con IA en un MVP que crezca.',
    link: 'Rescatamos tu MVP hecho con IA',
    href: '/ai-mvp-rescue',
  },
];

export const serviceHref = (id: Service['id']) => SERVICES.find((s) => s.id === id)!.href;

// "Otros servicios" on a service page: every other service
export const otherServices = (current: Service['id']) =>
  SERVICES.filter((s) => s.id !== current).map((s) => ({ label: s.link, href: s.href }));
