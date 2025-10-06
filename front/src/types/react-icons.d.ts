// Override React Icons types for React 19 compatibility
declare module 'react-icons/fi' {
  import { ComponentType, SVGProps } from 'react';
  
  export const FiPlus: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FiDatabase: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
}

declare module 'react-icons/fa' {
  import { ComponentType, SVGProps } from 'react';
  
  export const FaUser: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaComments: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaChartBar: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaBriefcase: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaAward: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaLinkedin: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaPencilAlt: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaEye: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaCheck: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaRegLightbulb: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const FaDatabase: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
}

declare module 'react-icons/bs' {
  import { ComponentType, SVGProps } from 'react';
  
  export const BsCardText: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
}

declare module 'react-icons/io' {
  import { ComponentType, SVGProps } from 'react';
  
  export const IoIosArrowForward: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const IoIosInformationCircleOutline: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const IoIosArrowBack: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
}

// Generic override for all react-icons
declare module 'react-icons/*' {
  import { ComponentType, SVGProps } from 'react';
  const Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export = Icon;
}
