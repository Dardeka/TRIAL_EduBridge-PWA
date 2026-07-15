import { Section, DemoBlock } from './section';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';

export function BadgeSection() {
  return (
    <Section
      id="badges"
      title="Badge"
      description="Eight variants and three sizes for status, labels, and counts."
    >
      <div className="space-y-6">
        <DemoBlock label="Variants">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">
            <CheckCircle2 className="h-3 w-3" /> Success
          </Badge>
          <Badge variant="warning">
            <AlertTriangle className="h-3 w-3" /> Warning
          </Badge>
          <Badge variant="info">
            <Info className="h-3 w-3" /> Info
          </Badge>
          <Badge variant="destructive">
            <XCircle className="h-3 w-3" /> Error
          </Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="outline">Outline</Badge>
        </DemoBlock>

        <DemoBlock label="Sizes">
          <Badge variant="default" size="sm">
            Small
          </Badge>
          <Badge variant="default">Default</Badge>
          <Badge variant="default" size="lg">
            Large
          </Badge>
        </DemoBlock>

        <DemoBlock label="Use Cases">
          <Badge variant="success">Enrolled</Badge>
          <Badge variant="warning">In Progress</Badge>
          <Badge variant="info">New</Badge>
          <Badge variant="destructive">Expired</Badge>
          <Badge variant="accent">Featured</Badge>
          <Badge variant="secondary">Draft</Badge>
        </DemoBlock>
      </div>
    </Section>
  );
}
