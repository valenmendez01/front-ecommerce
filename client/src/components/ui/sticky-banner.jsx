"use client";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "../../lib/utils";

let bannerCerrado = false;

export const StickyBanner = ({
  className,
  children,
  hideOnScroll = false
}) => {
  const [open, setOpen] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (hideOnScroll) {
      if (latest > 40) {
        setOpen(false);
      } else if (!bannerCerrado) {
        setOpen(true);
      }
    }
  });

  return (
    <motion.div
      className={cn(
        "sticky inset-x-0 top-0 z-40 flex w-full items-center justify-center bg-transparent px-4 py-1 overflow-hidden",
        className
      )}
      initial={{
        opacity: 0,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
      animate={{
        opacity: open ? 1 : 0,
        height: open ? "auto" : 0,
        minHeight: open ? "2rem" : 0,
        paddingTop: open ? "0.25rem" : 0,
        paddingBottom: open ? "0.25rem" : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}>
      {children}
      <motion.button
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
        onClick={() => {
          bannerCerrado = true;
          setOpen(false);
        }}
      >
        <CloseIcon className="h-5 w-5 text-white" />
      </motion.button>
    </motion.div>
  );
};

const CloseIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};
