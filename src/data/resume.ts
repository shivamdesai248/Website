import type { ReelItem } from '../components/Reel.astro';

// Reel photos (example: AstroPulse and SOAR reuse photos from their experience pages;
// new photos can go in src/assets/resume/).
import apCloseup from '../content/experience/astropulse/astropulse-thruster-closeup.jpg';
import apTestStand from '../content/experience/astropulse/test-stand-render.png';
import apVacuum from '../content/experience/astropulse/vacuum-test.jpg';
import apGauss from '../content/experience/astropulse/gauss-meter.jpg';
import apBooth from '../content/experience/astropulse/team-booth.jpg';
import soarBoards from '../content/experience/soar/embedded/board-stack.jpg';
import soarPcb from '../content/experience/soar/embedded/pcb-blue.png';
import soarBench from '../content/experience/soar/embedded/bench-testing.jpg';
import soarBay from '../content/experience/soar/mechanical/avionics-bay-in-hand.jpg';
import soarFea from '../content/experience/soar/mechanical/fea-result.png';
import soarRws from '../content/experience/soar/mechanical/rws-render.png';
import soarBattery from '../content/experience/soar/mechanical/battery-pack.png';

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
  /** Points shown directly under the role. Can be empty when the role uses `groups`. */
  bullets: string[];
  /** Optional named sub-sections, each with its own points (e.g. SOAR avionics vs mechanical). */
  groups?: { name: string; bullets: string[]; reel?: ReelItem[] }[];
  /**
   * Optional photo reel under the role (or under a group, via `groups[].reel`).
   * Put images in src/assets/resume/, import them at the top of this file, then e.g.
   *   reel: [{ image: mouldPart, alt: 'Injection-moulded enclosure', caption: 'Moulded enclosure' }],
   */
  reel?: ReelItem[];
}

export const roles: Role[] = [
  {
    title: 'Embedded Software Engineer 1',
    org: 'Garmin',
    team: 'Sensor Core platform team',
    period: 'Jul 2026 – Present',
    experience: 'garmin',
    bullets: [
      'Develop C++ firmware for Sensor Core, a shared sensor platform that ties low-level modules, the operating system and app features together, so product teams can integrate new sensors without starting from scratch',
      'Brought up a new product board at the lowest level, reviewing the schematic and integrating the SPI, I²C and UART communication drivers so higher-level software could run on the new hardware',
      'Research and build AI-assisted engineering workflows, including agents and skills that automate repetitive parts of firmware development',
    ],
  },
  {
    title: 'VP Software · Avionics Integration · Mechanical Design',
    org: 'SOAR',
    team: 'Student Organization for Aerospace Research',
    period: 'Sep 2022 – Aug 2026',
    experience: 'soar',
    bullets: [],
    groups: [
      {
        name: 'Avionics and software',
        bullets: [
          'Led the integration and testing of the electrical and embedded avionics for the Ouroboros hybrid rocket, bringing hardware, firmware and ground equipment together for flight',
          'Defined the high-level architecture of a new modular avionics system for the Aegis and Athena rockets, covering onboard and ground avionics, so boards can be reused and upgraded from one rocket to the next',
          'Developed a real-time flight operating system in C++ on FreeRTOS for STM32 microcontrollers, built around state machines that step the rocket safely through each phase of operation',
          'For Ouroboros, implemented software timers, state transitions, failure callbacks that put the rocket in a safe state when something goes wrong, and Protocol Buffers serialisation over UART for structured messages between subsystems',
          'For the Aegis Flight Control Board, built OS-level messaging and sensor drivers, and integrated safety-critical systems such as engine valve control',
          'Tested the main engine valve and onboard sensors (pressure transducers, thermocouples and infrared sensors), calibrating them and checking their response before flight',
          'Assembled and debugged PCBs from Altium designs using reflow soldering, oscilloscopes, logic analysers, multimeters and bench supplies, tracking down hardware and software issues such as incorrect ADC readings',
        ],
        reel: [
          { image: soarBoards, alt: 'Stack of avionics circuit boards in a 3D-printed frame', caption: 'Avionics board stack' },
          { image: soarPcb, alt: 'Blue avionics printed circuit board', caption: 'Avionics PCB' },
          { image: soarBench, alt: 'Shivam testing avionics hardware at a lab bench', caption: 'Bench testing avionics hardware' },
        ],
      },
      {
        name: 'Mechanical design and integration',
        bullets: [
          'Led the mechanical design of avionics integration for the Ouroboros, Aegis and Athena hybrid rockets',
          'Designed the Ouroboros avionics bay in SolidWorks to fit the onboard electronics within tight size limits and radio-transparency requirements, and built it with laser cutting, waterjet cutting and FDM 3D printing',
          'Designed a modular, metal additively manufactured avionics bay for Aegis using DfAM principles, packaging the avionics within the 6.65 in airframe while withstanding flight acceleration and vibration',
          'Validated structures with hand calculations and FEA in ANSYS Mechanical and SolidWorks, checking loading, deflection and failure risk before manufacturing',
          'Redesigned the Rocket Weigh System for Ouroboros and built a new iteration for Aegis to resolve load-cell drift, giving accurate and repeatable rocket mass measurements',
          'Designed 21700 and 18650 Li-ion flight battery packs for Ouroboros and Aegis, sized for the avionics power budget and retained against flight loads',
          'Presented designs at technical design reviews and gave critical feedback on other teams\' designs',
        ],
        reel: [
          { image: soarBay, alt: 'Shivam holding a finished avionics bay', caption: 'A finished avionics bay' },
          { image: soarFea, alt: 'FEA stress results on an avionics bay frame', caption: 'FEA results' },
          { image: soarRws, alt: 'Render of the Rocket Weigh System', caption: 'Rocket Weigh System' },
          { image: soarBattery, alt: 'Lithium-ion cells mounted in a 3D-printed holder', caption: 'Flight battery pack' },
        ],
      },
    ],
  },
  {
    title: 'Project Lead, Systems Engineer and Mechanical Designer',
    org: 'AstroPulse Capstone',
    team: 'University of Calgary',
    period: 'Sep 2025 – Apr 2026',
    experience: 'astropulse',
    bullets: [
      'Led the research and design of a Hall effect thruster for small satellites, taking it from concept to a manufacturable, testable prototype; the project won gold in the multidisciplinary engineering category and raised over $5,000 in sponsorship',
      'Designed and validated the magnetic circuit at the heart of the thruster through material selection, iterative ANSYS Maxwell simulation and field measurements checked against the simulation',
      'Designed the thruster architecture, injector, channel walls and subsystem interfaces through research, materials selection and CAD',
      'Contributed to the propellant feed system and vacuum test setup, validating them with leak and vacuum testing so the thruster could be run safely in the chamber',
      'Ran SolidWorks thermal simulations to guide part sizing, design refinement and the tolerances on manufacturing drawings',
      'Machined metal and ceramic components on the lathe, mill and waterjet, and completed final assembly of the thruster and propellant feed system',
      'Coordinated design reviews, progress tracking, resource requests and technical deliverables, while supporting vacuum testing and clean-room integration',
    ],
    reel: [
      { image: apBooth, alt: 'The AstroPulse team at their booth with the thruster on its test stand', caption: 'Design fair booth' },
      { image: apCloseup, alt: 'Cutaway render of the AstroPulse Hall-effect thruster firing', caption: 'Thruster cutaway render' },
      { image: apTestStand, alt: 'Render of the thruster on its static test stand', caption: 'Static test stand design' },
      { image: apGauss, alt: 'Gauss meter probe in the thruster channel on a milling machine', caption: 'Mapping the magnetic field' },
      { image: apVacuum, alt: 'The thruster glowing inside the vacuum chamber', caption: 'Testing in vacuum' },
    ],
  },
  {
    title: 'Software Engineering Intern',
    org: 'Garmin',
    team: 'MultiSport Sensors · Optical Platform Technology',
    period: 'May 2024 – Aug 2025',
    experience: 'garmin',
    bullets: [],
    groups: [
      {
        name: 'MultiSport Sensors',
        bullets: [
          'Developed and debugged embedded C++ drivers for the HRM 200 and HRM 600 heart-rate monitors (BLE, buttons, LEDs), redesigning APIs to make them easier to use and to reduce power consumption',
          'Brought automated testing into the HRM codebase with GoogleTest unit and integration tests, so driver changes are checked automatically instead of only on hardware',
          'Worked with the software, electrical and technical services teams to debug legacy code and integrate speed and cadence algorithms',
        ],
      },
      {
        name: 'Optical Platform Technology',
        bullets: [
          'Converted a legacy C codebase to a C++ architecture and designed an extensible C++ biosensor driver framework, so next-generation biosensors can be added without rewriting existing drivers',
          'Worked on next-generation biosensor features and PPG drivers, plus mechanical end-of-life testing and data-collection watch interfaces',
          'Built FARM (Fake AFE Register Map), a mocking framework that lets analog front-end driver code be tested end to end without physical hardware',
          'Implemented and debugged a new C++ manufacturing test framework, and worked with manufacturing teams to resolve production sensor noise and test failures',
        ],
      },
    ],
  },
  {
    title: 'Mechanical Designer',
    org: 'Yukon 3D Solutions',
    period: 'Apr 2024 – Sep 2024',
    bullets: [
      'Designed custom 3D-printed parts for clients in SolidWorks, turning their requirements into functional, printable CAD models',
      'Designed injection-moulded parts and validated them with SolidWorks injection moulding simulations, checking how the mould fills before committing to tooling',
    ],
  },
  {
    title: 'Technical Services Support',
    org: 'Schulich School of Engineering',
    period: 'Jul 2023 – Feb 2024',
    bullets: [
      'Designed parts in SolidWorks for the machine shop and its equipment, and manufactured them with the waterjet and FDM 3D printers',
      'Designed and built an organisation system for the machine-shop tooling, so tools have a fixed, easy-to-find place',
      'Rebuilt and repaired hotends on FDM 3D printers, diagnosing irregular extrusion, calibration problems and blockages',
      'Maintained and replaced components on machine-shop equipment (waterjets, lathes, mills and band saws) to keep it running for students and staff',
      'Taught a series of waterjet workshops so students could operate the machine safely and proficiently',
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
