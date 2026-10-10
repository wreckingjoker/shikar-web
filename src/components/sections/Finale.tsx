import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Finale — "Lamp" section (Claude.md §16 map: "Finale 'CREATE ONE.' -> Lamp section ...
 * Gold light, not cyan"). Hand-built (two converging conic beams + a blurred core line)
 * rather than pulling the 21st.dev component, so the glow is mustard and the motion obeys
 * `prefers-reduced-motion` exactly like the rest of the site.
 */
export function Finale() {
  const reduceMotion = useReducedMotion();
  const beamTransition = { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] as const };

  return (
    <section
      data-world="unknown"
      className="relative flex min-h-[80dvh] flex-col items-center justify-end overflow-hidden bg-deep-blue px-4 pb-16 pt-24 text-center"
    >
      <div className="relative flex w-full flex-1 items-end justify-center">
        <motion.div
          initial={reduceMotion ? undefined : { width: '4rem', opacity: 0.4 }}
          whileInView={{ width: '24rem', opacity: 0.9 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={beamTransition}
          style={{
            background:
              'conic-gradient(from 90deg at left top, var(--color-mustard), transparent)',
          }}
          className="absolute left-1/2 top-0 h-56 -translate-x-full"
        />
        <motion.div
          initial={reduceMotion ? undefined : { width: '4rem', opacity: 0.4 }}
          whileInView={{ width: '24rem', opacity: 0.9 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={beamTransition}
          style={{
            background:
              'conic-gradient(from 270deg at right top, var(--color-mustard), transparent)',
          }}
          className="absolute left-1/2 top-0 h-56"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-56 w-[28rem] -translate-x-1/2 bg-deep-blue [mask-image:radial-gradient(ellipse_at_top,transparent_0%,black_70%)]"
        />
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0.3, width: '8rem' }}
          whileInView={{ opacity: 1, width: '16rem' }}
          viewport={{ once: true, amount: 0.6 }}
          transition={beamTransition}
          className="absolute top-0 h-1 bg-mustard shadow-glow blur-sm"
        />
      </div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative z-10 mt-6 max-w-lg"
      >
        <p className="text-lg text-silver/85 md:text-lg-d">
          The future does not have a playbook.
        </p>
        <h2 className="mt-3 text-4xl leading-[0.95] text-silver md:text-4xl-d">Create one.</h2>
        <Button asChild variant="primary" glow className="mt-8">
          <Link to="/register">Register now</Link>
        </Button>
      </motion.div>
    </section>
  );
}
