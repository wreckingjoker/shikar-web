import type { ComponentProps } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn('flex gap-2 overflow-x-auto border-b border-border', className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'min-h-[44px] shrink-0 border-b-2 border-transparent px-4 font-display text-xs uppercase tracking-[0.15em] text-secondary transition-colors duration-base ease-sand data-[state=active]:border-accent data-[state=active]:text-accent',
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn('pt-5', className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
