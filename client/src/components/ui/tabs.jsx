import { motion } from 'motion/react'
import { cn } from '../../lib/utils'

const Tabs = ({
  activeTabClassName,
  className,
  onChange,
  tabClassName,
  tabs,
  value,
}) => (
  <div
    className={cn(
      'flex max-w-full items-center gap-2 overflow-auto [perspective:1000px]',
      className,
    )}
  >
    {tabs.map((tab) => (
      <button
        className={cn(
          'relative rounded-full px-4 py-2 text-sm font-bold',
          tabClassName,
        )}
        key={tab.value}
        style={{ transformStyle: 'preserve-3d' }}
        type="button"
        onClick={() => onChange(tab.value)}
      >
        {value === tab.value && (
          <motion.span
            className={cn('absolute inset-0 rounded-full bg-dorado-primary', activeTabClassName)}
            layoutId="tab-activa"
            transition={{ bounce: 0.3, duration: 0.6, type: 'spring' }}
          />
        )}
        <span className="relative z-10">{tab.title}</span>
      </button>
    ))}
  </div>
)

export default Tabs
