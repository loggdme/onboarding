import { cn } from '$/lib/utils';

interface CircularProgressProps {
  value: number;
  renderLabel?: (progress: number) => number | string;
  size?: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;
  shape?: 'square' | 'round';
  className?: string;
  progressClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
}

export const CircularProgress = ({
  value,
  renderLabel,
  className,
  progressClassName,
  labelClassName,
  showLabel,
  shape = 'round',
  size = 100,
  strokeWidth,
  circleStrokeWidth = 10,
  progressStrokeWidth = 10,
}: CircularProgressProps) => {
  const radius = size / 2 - circleStrokeWidth / 2;
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
            className={cn('stroke-primary/25', className)}
            cx={size / 2}
            cy={size / 2}
            fill="transparent"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset="0"
            strokeWidth={strokeWidth ?? circleStrokeWidth}
          />
          <circle
            className={cn('stroke-primary', progressClassName)}
            cx={size / 2}
            cy={size / 2}
            fill="transparent"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={percentage}
            strokeLinecap={shape}
            strokeWidth={strokeWidth ?? progressStrokeWidth}
          />
        </svg>
        {showLabel && (
          <div className={cn('absolute inset-0 flex items-center justify-center text-md', labelClassName)}>
            {renderLabel ? renderLabel(value) : value}
          </div>
        )}
      </div>
    </div>
  );
};
