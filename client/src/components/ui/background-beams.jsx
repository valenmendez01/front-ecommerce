import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

const caminos = [
  "M-696 249C-498 152 -353 121 -183 214C-13 307 124 420 284 395C444 370 544 207 707 247C870 287 955 470 1137 449",
  "M-634 355C-457 255 -296 227 -125 305C46 383 173 517 352 505C531 493 653 331 821 365C989 399 1059 572 1244 566",
  "M-573 468C-402 365 -224 340 -49 422C126 504 247 637 421 626C595 615 723 459 895 492C1067 525 1148 687 1309 679",
  "M-513 586C-342 484 -157 459 18 536C193 613 314 748 488 741C662 734 789 575 961 609C1133 643 1215 803 1376 797",
  "M-454 698C-289 601 -94 571 79 647C252 723 375 857 549 852C723 847 850 689 1024 724C1198 759 1282 916 1438 914",
]

const demoras = [0, 0.55, 1.1, 1.65, 2.2]

const BackgroundBeams = ({ className = "", color = "#caa56e" }) => (
  <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
    <svg
      className="absolute inset-0 h-full w-full"
      fill="none"
      viewBox="0 0 696 316"
      xmlns="http://www.w3.org/2000/svg"
    >
      {caminos.map((camino, index) => (
        <g key={camino}>
          <path d={camino} stroke={color} strokeOpacity="0.11" strokeWidth="0.8" />
          <motion.path
            animate={{ opacity: [0, 0.72, 0], pathLength: [0, 1, 1] }}
            d={camino}
            initial={{ opacity: 0, pathLength: 0 }}
            stroke={`url(#beam-${index})`}
            strokeLinecap="round"
            strokeWidth="1.8"
            transition={{
              delay: demoras[index],
              duration: 5.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1.1,
            }}
          />
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`beam-${index}`}
              x1="0"
              x2="696"
              y1="0"
              y2="316"
            >
              <stop stopColor={color} stopOpacity="0" />
              <stop offset="0.35" stopColor={color} stopOpacity="0.9" />
              <stop offset="0.7" stopColor="#fff3c4" stopOpacity="0.78" />
              <stop offset="1" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
        </g>
      ))}
    </svg>
  </div>
)

export default BackgroundBeams
