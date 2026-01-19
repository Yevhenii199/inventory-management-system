interface ClockIconProps {
  color?: string;
  size?: string;
}

export const ClockIcon = ({ color = '#82B941', size = '20px' }: ClockIconProps) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="3" 
    style={{ width: size, height: size }}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);