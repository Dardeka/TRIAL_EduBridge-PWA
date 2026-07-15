import { Section, DemoBlock } from './section';
import { Progress } from '@/components/ui/progress';

export function ProgressSection() {
  return (
    <Section
      id="progress"
      title="Progress Bar"
      description="Three sizes and five color variants for loading and completion states."
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <DemoBlock label="Sizes">
            <div className="w-full max-w-md space-y-4">
              <Progress value={75} size="sm" />
              <Progress value={75} size="default" />
              <Progress value={75} size="lg" />
            </div>
          </DemoBlock>
        </div>

        <div className="space-y-4">
          <DemoBlock label="Color Variants">
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">
                  Default (Primary)
                </span>
                <Progress value={60} />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Success</span>
                <Progress value={85} color="success" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Warning</span>
                <Progress value={45} color="warning" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">
                  Destructive
                </span>
                <Progress value={20} color="destructive" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Info</span>
                <Progress value={70} color="info" />
              </div>
            </div>
          </DemoBlock>
        </div>

        <DemoBlock label="With Labels">
          <div className="w-full max-w-md space-y-3">
            {[
              { label: 'HTML Basics', value: 100, color: 'success' as const },
              { label: 'CSS Layouts', value: 75, color: 'default' as const },
              { label: 'JavaScript', value: 45, color: 'warning' as const },
              { label: 'React', value: 10, color: 'destructive' as const },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <Progress value={item.value} color={item.color} />
              </div>
            ))}
          </div>
        </DemoBlock>
      </div>
    </Section>
  );
}
