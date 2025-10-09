// Type declarations for React Icons compatibility with React 19
import React from 'react';

// Generic declaration for all react-icons modules
declare module 'react-icons/*' {
  const Icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export = Icon;
}

// Specific declarations for commonly used icons
declare module 'react-icons/fi' {
  export const FiPlus: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FiDatabase: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
}

declare module 'react-icons/fa' {
  export const FaUser: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaComments: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaChartBar: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaBriefcase: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaAward: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaLinkedin: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaPencilAlt: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaEye: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaCheck: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaRegLightbulb: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaDatabase: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
}

declare module 'react-icons/bs' {
  export const BsCardText: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
}

declare module 'react-icons/io' {
  export const IoIosArrowForward: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const IoIosInformationCircleOutline: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const IoIosArrowBack: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
}
