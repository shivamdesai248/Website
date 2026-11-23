/**
 * People who present their work well, listed under "Inspiration" on the Design page.
 * `note` is optional; keep it to one factual line.
 */
export interface Inspiration {
  name: string;
  href: string;
  note?: string;
}

export const inspiration: Inspiration[] = [
  { name: 'Vishnu Dhanda', href: 'https://www.linkedin.com/in/vishnudhanda/' },
  { name: 'Nicholas Elderfield', href: 'https://www.linkedin.com/in/nickelderfield/' },
  { name: 'Anthony Nemish', href: 'https://www.linkedin.com/in/anthonynemish/' },
  {
    name: 'Nicholas Sharp',
    href: 'https://nmwsharp.com/',
    note: 'Geometry processing and graphics research at NVIDIA, shown through clear visuals and open-source tools like Polyscope.',
  },
  {
    name: 'Caden Kraft',
    href: 'https://cadenkraft.com/',
    note: 'Mechanical engineering write-ups, from 3D-printed actuators and a SCARA arm to solar car electronics.',
  },
];
