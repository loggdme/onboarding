import { cn } from '$/lib/utils';

interface CircularProgressProps {
  value: number;
  renderLabel?: (progress: number) => number | string;
  size?: number;
  strokeWidth?: number;
  colorClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
}

export const CircularProgress = ({
  value,
  renderLabel,
  colorClassName,
  labelClassName,
  showLabel,
  size = 100,
  strokeWidth = 10,
}: CircularProgressProps) => {
  const radius = size / 2 - strokeWidth / 2;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - value) / 100));

  return (
    <div className="flex">
      <div className="relative">
        <svg
          className="relative"
          height={size}
          style={{ transform: 'rotate(-90deg)' }}
          version="1.1"
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Circular Progress</title>
          <circle
            className={colorClassName ?? 'stroke-primary/25'}
            cx={size / 2}
            cy={size / 2}
            fill="transparent"
            opacity={0.2}
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset="0"
            strokeWidth={strokeWidth}
          />
          <circle
            className={colorClassName ?? 'stroke-primary'}
            cx={size / 2}
            cy={size / 2}
            fill="transparent"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={percentage}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
        </svg>
        {showLabel && (
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              labelClassName
            )}
          >
            {renderLabel ? renderLabel(value) : value}
          </div>
        )}
      </div>
    </div>
  );
};
