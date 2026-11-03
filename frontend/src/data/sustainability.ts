/**
 * Sustainability page content: the grievance mechanism documents and the
 * reports library. Every document link is null until the file is supplied;
 * a null link is hidden on the page and listed in HANDOFF.md.
 */
export interface Doc {
  label: string;
  /** What the reader will find in it. */
  note: string;
  href: string | null;
}

export interface Report {
  title: string;
  year: string;
  href: string | null;
}

export const SUSTAINABILITY = {
  intro:
    'How CBZ Holdings reports on its environmental and social performance, and how anyone affected by our operations can raise a grievance and have it resolved.',
  grievance: {
    lede:
      'A grievance is any concern about the impact of CBZ or a company it finances on people, communities or the environment. Anyone can raise one, and you do not have to be a customer.',
    documents: [
      {
        label: 'Grievance Procedure',
        note: 'How a grievance is received, acknowledged, investigated and resolved, and the timelines at each step.',
        href: null,
      },
      {
        label: 'Grievance Resolution Form',
        note: 'The form to complete and return to us by email or at any branch.',
        href: null,
      },
    ] as Doc[],
    /** Mailbox for grievances. Null until Sustainability supplies it. */
    email: null as string | null,
  },
  reports: [] as Report[],
} as const;
