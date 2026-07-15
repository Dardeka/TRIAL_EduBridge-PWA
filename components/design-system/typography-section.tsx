import { Section, DemoBlock } from './section';

const fontSizes = [
  { name: 'Display', className: 'text-5xl font-bold', sample: 'Aa' },
  { name: 'H1', className: 'text-4xl font-bold', sample: 'Aa' },
  { name: 'H2', className: 'text-3xl font-bold', sample: 'Aa' },
  { name: 'H3', className: 'text-2xl font-semibold', sample: 'Aa' },
  { name: 'H4', className: 'text-xl font-semibold', sample: 'Aa' },
  { name: 'Body', className: 'text-base', sample: 'Aa' },
  { name: 'Small', className: 'text-sm', sample: 'Aa' },
  { name: 'Caption', className: 'text-xs', sample: 'Aa' },
];

const weights = [
  { name: 'Regular', className: 'font-normal' },
  { name: 'Medium', className: 'font-medium' },
  { name: 'Semibold', className: 'font-semibold' },
  { name: 'Bold', className: 'font-bold' },
];

export function TypographySection() {
  return (
    <Section
      id="typography"
      title="Typography"
      description="Font hierarchy using Plus Jakarta Sans for headings and Inter for body text."
    >
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {fontSizes.map((font) => (
            <div
              key={font.name}
              className="rounded-lg border bg-card p-4 text-center"
            >
              <p className={`${font.className} font-heading text-primary`}>
                {font.sample}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{font.name}</p>
              <p className="text-[10px] text-muted-foreground/70">
                {font.className.split(' ')[0]}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <DemoBlock label="Headings">
            <div className="space-y-2">
              <h1 className="font-heading text-4xl font-bold tracking-tight">
                Bridge your learning journey
              </h1>
              <h2 className="font-heading text-3xl font-bold">
                Discover courses tailored to you
              </h2>
              <h3 className="font-heading text-2xl font-semibold">
                Track your progress
              </h3>
              <h4 className="font-heading text-xl font-semibold">
                Join a community of learners
              </h4>
            </div>
          </DemoBlock>

          <DemoBlock label="Body Text">
            <div className="max-w-2xl space-y-2">
              <p className="text-base leading-relaxed">
                EduBridge connects students with expert educators through an
                intuitive platform designed for accessible, high-quality
                learning experiences.
              </p>
              <p className="text-sm text-muted-foreground">
                Small text for secondary information, captions, and supporting
                details throughout the interface.
              </p>
            </div>
          </DemoBlock>

          <DemoBlock label="Font Weights">
            <div className="flex flex-wrap gap-6">
              {weights.map((w) => (
                <span key={w.name} className={`${w.className} text-lg`}>
                  {w.name}
                </span>
              ))}
            </div>
          </DemoBlock>
        </div>
      </div>
    </Section>
  );
}
