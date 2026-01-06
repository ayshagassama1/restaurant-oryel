import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
 
export const Tabs = TabsPrimitive.Root;
 
export function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn('inline-flex items-center justify-center rounded-full bg-secondary p-1', className)}
      {...props}
    />
  );
}
 
export function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium text-muted-foreground transition-all focus-visible:outline-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
        className
      )}
      {...props}
    />
  );
}
