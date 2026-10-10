import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Finale — "Create one." The supplied artwork (strategists climbing the golden stair
 * toward the Shikhar city at sunrise) is the full-bleed background; an earlier version
 * hand-built a synthetic "Lamp" gold-beam effect (Claude.md §16 map) to stand in for real
 * art — now that this exists, the beams are retired in favour of the actual image, with a
 * deep-blue gradient wash so the headline stays legible over a bright sky.
 */
export function Finale() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      data-world="unknown"
      className="relative flex min-h-[80dvh] flex-col items-center justify-end overflow-hidden bg-deep-blue px-4 pb-16 pt-24 text-center"
    >
      <picture aria-hidden="true" className="absolute inset-0">
        <source srcSet="/img/finale.avif" type="image/avif" />
        <source srcSet="/img/finale.webp" type="image/webp" />
        <img
          src="/img/finale.webp"
          alt=""
          loading="lazy"
          decoding="async"
          // Phones crop the wide art: shift right so the "SHIKHAR" sign on the city (~66%
          // across) is centred in view instead of cut off at the edge.
          className="h-full w-full object-cover object-[73%_50%] md:object-center"
        />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-deep-blue/35 via-deep-blue/45 to-deep-blue"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_75%,rgba(11,28,53,0.75),transparent_70%)]"
      />

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative z-10 mt-6 max-w-lg"
      >
        <p className="text-lg text-silver/85 [text-shadow:0_2px_12px_rgba(0,0,0,0.8)] md:text-lg-d">
          The future does not have a playbook.
        </p>
        <h2 className="mt-3 text-4xl leading-[0.95] text-silver [text-shadow:0_4px_20px_rgba(0,0,0,0.8)] md:text-4xl-d">
          Create one.
        </h2>
        <Button asChild variant="primary" glow className="mt-8">
          <Link to="/register">Register now</Link>
        </Button>
      </motion.div>
    </section>
  );
}
