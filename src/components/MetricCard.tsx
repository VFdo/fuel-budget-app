interface MetricCardProps {
  label: string
  value: string
  subtext?: string
  variant?: 'default' | 'highlight' | 'muted'
}

const variantStyles = {
  default:
    'border-slate-200/80 bg-slate-50/80 dark:border-slate-700/80 dark:bg-slate-800/40',
  highlight:
    'border-blue-200/80 bg-blue-50/80 dark:border-blue-900/50 dark:bg-blue-950/30',
  muted:
    'border-slate-200/60 bg-white/50 dark:border-slate-800 dark:bg-slate-900/30',
}

export function MetricCard({
  label,
  value,
  subtext,
  variant = 'default',
}: MetricCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 transition-colors duration-300 ${variantStyles[variant]}`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold tabular-nums tracking-tight text-slate-900 dark:text-white sm:text-[1.65rem]">
        {value}
      </p>
      {subtext && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtext}</p>
      )}
    </div>
  )
}
