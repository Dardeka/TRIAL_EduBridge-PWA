import { BookX, FolderOpen, Plus, Search } from 'lucide-react';
import { Section, DemoBlock } from './section';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';

export function EmptyStateSection() {
  return (
    <Section
      id="empty-state"
      title="Empty State"
      description="Friendly placeholder components for when there's no data to show."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-card">
          <EmptyState
            icon={<BookX className="h-5 w-5" />}
            title="No courses yet"
            description="Browse our catalog and enroll in your first course to get started."
            action={<Button size="sm">Browse Courses</Button>}
          />
        </div>

        <div className="rounded-lg border bg-card">
          <EmptyState
            size="sm"
            icon={<Search className="h-4 w-4" />}
            title="No results found"
            description="Try adjusting your search or filters."
          />
        </div>

        <div className="rounded-lg border bg-card">
          <EmptyState
            icon={<FolderOpen className="h-5 w-5" />}
            title="No projects"
            description="Create your first project to start organizing your work."
            action={
              <Button size="sm" variant="accent" className="gap-2">
                <Plus className="h-4 w-4" /> New Project
              </Button>
            }
          />
        </div>
      </div>
    </Section>
  );
}
