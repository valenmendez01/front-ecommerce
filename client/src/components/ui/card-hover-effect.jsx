import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { cn } from "../../lib/utils";

export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10", className)}>
      {items.map((item, index) => (
        <div
          key={item?.link || item?.title}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={item.onClick}
          onKeyDown={item.onKeyDown}
          role={item.role}
          tabIndex={item.tabIndex}
        >
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-yellow-400/25 block rounded-2xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          {item.children || (
            <Card>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => (
  <div
    className={cn(
      "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
      className,
    )}
  >
    <div className="relative z-50">
      <div className="p-2">{children}</div>
    </div>
  </div>
);

export const CardTitle = ({ className, children }) => (
  <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
    {children}
  </h4>
);

export const CardDescription = ({ className, children }) => (
  <p className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
    {children}
  </p>
);
