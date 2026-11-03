import { ICONS, type IconName } from '../components/icons';

interface Props {
  name: IconName;
  size?: number;
  label?: string;
  className?: string;
}

/** React twin of <Icon.astro> for use inside islands. */
export function Icon({ name, size = 20, label, className }: Props) {
  const icon = ICONS[name] as { d: string; fill?: boolean };
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={icon.fill ? 'currentColor' : 'none'}
      stroke={icon.fill ? 'none' : 'currentColor'}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path d={icon.d} />
    </svg>
  );
}
