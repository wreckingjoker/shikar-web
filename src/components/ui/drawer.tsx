// Bottom sheet, built on vaul (shadcn's Drawer primitive — Claude.md §16 component map:
// "Event detail sheet -> shadcn Drawer (vaul)"). Reskinned to Design.md tokens:
// radius-md top corners, shadow-lg, color-surface body, focus trap + Esc/back close
// are handled by vaul/Radix Dialog under the hood.
import type { ComponentProps } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '@/lib/utils';

const Drawer = DrawerPrimitive.Root;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerClose = DrawerPrimitive.Close;
const DrawerPortal = DrawerPrimitive.Portal;

function DrawerOverlay({ className, ...props }: ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      className={cn('fixed inset-0 z-50 bg-black/70', className)}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 flex max-h-[88dvh] flex-col rounded-t-md border-t border-border bg-surface shadow-lg outline-none',
          className,
        )}
        {...props}
      >
        <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-pill bg-border" aria-hidden="true" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

export { Drawer, DrawerTrigger, DrawerClose, DrawerContent, DrawerPortal, DrawerOverlay };
