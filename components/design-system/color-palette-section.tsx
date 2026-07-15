import { Section, DemoBlock } from './section';

const colorGroups = [
  {
    name: 'Primary',
    description: 'Deep Teal — main brand color',
    prefix: 'bg-primary',
    ramp: [
      { shade: '50', cls: 'bg-primary-50' },
      { shade: '100', cls: 'bg-primary-100' },
      { shade: '200', cls: 'bg-primary-200' },
      { shade: '300', cls: 'bg-primary-300' },
      { shade: '400', cls: 'bg-primary-400' },
      { shade: '500', cls: 'bg-primary-500' },
      { shade: '600', cls: 'bg-primary-600' },
      { shade: '700', cls: 'bg-primary-700' },
      { shade: '800', cls: 'bg-primary-800' },
      { shade: '900', cls: 'bg-primary-900' },
    ],
  },
  {
    name: 'Accent',
    description: 'Amber Gold — highlights and CTAs',
    prefix: 'bg-accent',
    ramp: [
      { shade: '50', cls: 'bg-accent-50' },
      { shade: '100', cls: 'bg-accent-100' },
      { shade: '200', cls: 'bg-accent-200' },
      { shade: '300', cls: 'bg-accent-300' },
      { shade: '400', cls: 'bg-accent-400' },
      { shade: '500', cls: 'bg-accent-500' },
      { shade: '600', cls: 'bg-accent-600' },
      { shade: '700', cls: 'bg-accent-700' },
      { shade: '800', cls: 'bg-accent-800' },
      { shade: '900', cls: 'bg-accent-900' },
    ],
  },
];

const semanticColors = [
  { name: 'Success', cls: 'bg-success', textCls: 'text-success' },
  { name: 'Warning', cls: 'bg-warning', textCls: 'text-warning' },
  { name: 'Error', cls: 'bg-destructive', textCls: 'text-destructive' },
  { name: 'Info', cls: 'bg-info', textCls: 'text-info' },
];

const neutralColors = [
  { name: 'Background', cls: 'bg-background border', text: 'text-foreground' },
  { name: 'Card', cls: 'bg-card border', text: 'text-card-foreground' },
  { name: 'Muted', cls: 'bg-muted', text: 'text-muted-foreground' },
  { name: 'Border', cls: 'bg-border', text: 'text-foreground' },
];

export function ColorPaletteSection() {
  return (
    <Section
      id="colors"
      title="Color Palette"
      description="A warm, education-oriented palette with teal primary, amber accent, and full semantic ramps."
    >
      <div className="space-y-8">
        {/* Full ramps */}
        {colorGroups.map((group) => (
          <div key={group.name}>
            <div className="mb-3">
              <h3 className="font-heading text-lg font-semibold">
                {group.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {group.description}
              </p>
            </div>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
              {group.ramp.map((c) => (
                <div key={c.shade} className="group">
                  <div
                    className={`${c.cls} h-16 rounded-md transition-transform group-hover:scale-105`}
                  />
                  <p className="mt-1 text-center text-xs font-medium">
                    {c.shade}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Semantic colors */}
        <div>
          <h3 className="mb-3 font-heading text-lg font-semibold">Semantic</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {semanticColors.map((c) => (
              <div key={c.name} className="overflow-hidden rounded-lg border">
                <div className={`${c.cls} h-20`} />
                <div className="p-3">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className={`text-xs ${c.textCls}`}>
                    {c.name.toLowerCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Neutral colors */}
        <div>
          <h3 className="mb-3 font-heading text-lg font-semibold">
            Neutrals &amp; Surfaces
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {neutralColors.map((c) => (
              <div
                key={c.name}
                className={`${c.cls} flex h-20 flex-col justify-end rounded-lg p-3`}
              >
                <p className={`text-sm font-semibold ${c.text}`}>{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
