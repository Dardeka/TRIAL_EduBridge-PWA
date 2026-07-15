import { Section, DemoBlock } from './section';
import {
  CardSkeleton,
  AvatarSkeleton,
  ListSkeleton,
  StatCardSkeleton,
  ChartSkeleton,
} from '@/components/ui/skeleton-presets';

export function SkeletonSection() {
  return (
    <Section
      id="skeletons"
      title="Skeleton Loading"
      description="Placeholder previews for cards, lists, stats, charts, and avatars while content loads."
    >
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <DemoBlock label="Card Skeleton">
            <CardSkeleton className="w-full" />
          </DemoBlock>
          <DemoBlock label="Chart Skeleton">
            <ChartSkeleton />
          </DemoBlock>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <DemoBlock label="List Skeleton">
            <div className="w-full">
              <ListSkeleton rows={4} />
            </div>
          </DemoBlock>
          <DemoBlock label="Avatar Skeleton">
            <div className="w-full space-y-4">
              <AvatarSkeleton />
              <AvatarSkeleton />
              <AvatarSkeleton />
            </div>
          </DemoBlock>
        </div>
      </div>
    </Section>
  );
}
