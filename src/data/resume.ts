/**
 * Single source for the resume page, the home page skills section and the
 * "other experience" list. Edit here, not in the pages.
 */

export interface Role {
  title: string;
  org: string;
  /** Sub-team or context, e.g. "Sensor Core platform team" */
  team?: string;
  period: string;
  /** Links the entry to an experience page: /experience/<slug> */
  experience?: 'astropulse' | 'soar' | 'garmin';
  bullets: string[];
}

export const roles: Role[] = [
  {
    title: 'Embedded Software Engineer 1',
    org: 'Garmin',
    team: 'Sensor Core platform team',
    period: 'Jul 2026 – Present',
    experience: 'garmin',
    bullets: [
      'Develop firmware in C++ for a shared sensor platform that ties low-level modules, the OS and app features together so product teams can integrate quickly',
      'Brought up a new product board at the lowest level: schematic review and integration of SPI, I²C and UART communication drivers',
      'Research and build AI-assisted engineering workflows, including agents and skills that automate repetitive parts of the job',
    ],
  },
  {
    title: 'Project Lead, Systems Engineer and Mechanical Designer',
    org: 'AstroPulse Capstone',
    team: 'University of Calgary',
    period: 'Sep 2025 – Apr 2026',
    experience: 'astropulse',
    bullets: [
      'Led the research and design of a Hall effect thruster, taking it from concept to a manufacturable, testable prototype',
      'Designed and validated the magnetic circuit through material selection, iterative ANSYS Maxwell simulation and field measurements',
      'Designed the thruster architecture, injector, channel walls and subsystem interfaces; contributed to the propellant feed and vacuum test setup',
      'Ran SolidWorks thermal simulations to guide part sizing and tolerancing',
      'Machined metal and ceramic parts on the lathe, mill and waterjet, and assembled the thruster and feed system',
      'Coordinated design reviews, progress tracking and technical deliverables; supported vacuum testing and clean-room integration',
    ],
  },
  {
    title: 'Software Engineering Intern',
    org: 'Garmin',
    team: 'MultiSport Sensors · Optical Platform Technology',
    period: 'May 2024 – Aug 2025',
    experience: 'garmin',
    bullets: [
      'Developed and debugged embedded C++ drivers for the HRM 200 and HRM 600 (BLE, buttons, LEDs), including API redesigns for usability and power savings',
      'Added automated unit and integration testing to the HRM codebase with GoogleTest',
      'Converted a legacy C codebase to C++ and designed an extensible biosensor driver framework for next-generation sensors',
      'Built FARM (Fake AFE Register Map), a mocking framework for end-to-end testing of analog front-end driver code without hardware',
      'Implemented a new C++ manufacturing test framework and worked with teams in Taiwan to resolve production sensor noise and test failures',
    ],
  },
  {
    title: 'VP Software · Avionics Integration · Mechanical Design',
    org: 'SOAR',
    team: 'Student Organization for Aerospace Research',
    period: 'Sep 2022 – Present',
    experience: 'soar',
    bullets: [
      'Led integration and testing of the electrical and embedded avionics for the Ouroboros hybrid rocket',
      'Defined the architecture of a new modular onboard and ground avionics system for the Aegis and Athena rockets',
      'Wrote embedded C++ on FreeRTOS: software timers, state machines, failure callbacks, Protocol Buffers over UART, sensor drivers and OS messaging',
      'Tested the main engine valve and onboard sensors: pressure transducers, thermocouples and IR sensors',
      'Led mechanical design of avionics integration, including a metal additively manufactured avionics bay for Aegis',
      'Redesigned the Rocket Weigh System to fix load-cell drift, and designed 21700 and 18650 Li-ion flight battery packs',
    ],
  },
  {
    title: 'Mechanical Designer',
    org: 'Yukon 3D Solutions',
    period: 'Apr 2024 – Sep 2024',
    bullets: [
      'Designed custom 3D-printed parts for clients in SolidWorks',
      'Designed injection-moulded parts and validated them with SolidWorks moulding simulations',
    ],
  },
  {
    title: 'Technical Services Support',
    org: 'Schulich School of Engineering',
    period: 'Jul 2023 – Feb 2024',
    bullets: [
      'Maintained and repaired machine-shop equipment (waterjets, lathes, mills, band saws) and FDM 3D printers',
      'Designed and built a tooling organisation system for the machine shop',
      'Taught waterjet workshops on safe, proficient operation',
    ],
  },
];

export const education = {
  school: 'University of Calgary',
  degree: 'BSc Software Engineering, Minor in Mechatronics',
  period: 'Sep 2021 – May 2026',
};

export interface SkillGroup {
  name: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    name: 'Software and firmware',
    items: ['C', 'C++', 'FreeRTOS', 'Python', 'JavaScript', 'React', 'ROS', 'Arduino', 'GoogleTest', 'Protocol Buffers'],
  },
  {
    name: 'Electrical and test',
    items: ['SPI / I²C / UART', 'BLE', 'Board bring-up', 'Schematic review', 'Altium', 'Oscilloscopes', 'Logic analyzers', 'SMD soldering'],
  },
  {
    name: 'Mechanical and simulation',
    items: ['SolidWorks', 'SolidWorks Simulation', 'ANSYS Mechanical', 'ANSYS Maxwell', 'nTop', 'DfAM', 'Thermal analysis'],
  },
  {
    name: 'Manufacturing',
    items: ['Manual lathe and mill', 'Waterjet', 'Laser cutting', 'Metal and polymer 3D printing', 'Vacuum testing'],
  },
  {
    name: 'Tools',
    items: ['Git', 'Gerrit', 'STM32CubeIDE', 'IAR Embedded Workbench', 'MPLAB', 'Saleae Logic', 'VS Code', 'Figma', 'Blender'],
  },
];

/** Roles without their own experience page, shown in the compact "Other experience" list. */
export const otherRoles = roles.filter((r) => !r.experience);
