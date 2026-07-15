import {
  ArrowRight,
  Download,
  Mail,
  Heart,
  Plus,
  Trash2,
  Settings,
} from 'lucide-react';
import { Section, DemoBlock } from './section';
import { Button } from '@/components/ui/button';

export function ButtonSection() {
  return (
    <Section
      id="buttons"
      title="Button"
      description="Seven variants, five sizes, with icon support and active scale animation."
    >
      <div className="space-y-6">
        <DemoBlock label="Variants">
          <Button>Default</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </DemoBlock>

        <DemoBlock label="Sizes">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </DemoBlock>

        <DemoBlock label="With Icons">
          <Button className="gap-2">
            Get Started <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="accent" className="gap-2">
            <Download className="h-4 w-4" /> Download
          </Button>
          <Button variant="outline" className="gap-2">
            <Mail className="h-4 w-4" /> Contact
          </Button>
          <Button variant="success" className="gap-2">
            <Heart className="h-4 w-4" /> Subscribe
          </Button>
        </DemoBlock>

        <DemoBlock label="Icon Buttons">
          <Button size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Button size="icon-sm" variant="outline">
            <Settings className="h-3.5 w-3.5" />
          </Button>
          <Button size="icon" variant="destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button size="icon-lg" variant="accent">
            <Heart className="h-5 w-5" />
          </Button>
        </DemoBlock>

        <DemoBlock label="States">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
        </DemoBlock>
      </div>
    </Section>
  );
}
