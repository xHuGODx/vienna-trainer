import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, ...props }: Props) {
  return <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size} {...props}>{children}</svg>;
}

export function KnightIcon(props: Props) {
  return <Icon {...props}><path d="M8 20h10M7 17h11l-1-5-3-4 1-4-6 2-3 5 3 2-2 4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/><path d="m9 6 4 3" stroke="currentColor" strokeWidth="1.8"/></Icon>;
}

export function TargetIcon(props: Props) {
  return <Icon {...props}><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="1" fill="currentColor"/></Icon>;
}

export function BookIcon(props: Props) {
  return <Icon {...props}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"/></Icon>;
}

export function ChartIcon(props: Props) {
  return <Icon {...props}><path d="M5 20V10M12 20V4M19 20v-7" stroke="currentColor" strokeLinecap="round" strokeWidth="2"/></Icon>;
}

export function ArrowRightIcon(props: Props) {
  return <Icon {...props}><path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></Icon>;
}

export function ArrowLeftIcon(props: Props) {
  return <Icon {...props}><path d="M19 12H5M10 7l-5 5 5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></Icon>;
}

export function ChevronLeftIcon(props: Props) {
  return <Icon {...props}><path d="m14 7-5 5 5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></Icon>;
}

export function ChevronRightIcon(props: Props) {
  return <Icon {...props}><path d="m10 7 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></Icon>;
}

export function RotateIcon(props: Props) {
  return <Icon {...props}><path d="M20 7v5h-5M4 17v-5h5M18.5 10A7 7 0 0 0 6.2 7.5L4 12M5.5 14A7 7 0 0 0 17.8 16.5L20 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/></Icon>;
}

export function SearchIcon(props: Props) {
  return <Icon {...props}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/></Icon>;
}

export function CheckIcon(props: Props) {
  return <Icon {...props}><path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></Icon>;
}

export function CloseIcon(props: Props) {
  return <Icon {...props}><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2"/></Icon>;
}

export function LightbulbIcon(props: Props) {
  return <Icon {...props}><path d="M9 18h6M10 21h4M8.5 14.5A7 7 0 1 1 15.5 14.5c-1 .8-1.5 1.6-1.5 2.5h-4c0-.9-.5-1.7-1.5-2.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7"/></Icon>;
}

export function ShareIcon(props: Props) {
  return <Icon {...props}><circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7"/><circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="m8.2 10.8 7.5-4.5M8.2 13.2l7.5 4.5" stroke="currentColor" strokeWidth="1.7"/></Icon>;
}

export function SoundIcon({ muted = false, ...props }: Props & { muted?: boolean }) {
  return <Icon {...props}><path d="M5 10v4h3l4 3V7l-4 3H5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"/>{muted ? <path d="m16 10 4 4m0-4-4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/> : <><path d="M15 9.5a4 4 0 0 1 0 5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/><path d="M18 7a7 7 0 0 1 0 10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/></>}</Icon>;
}
