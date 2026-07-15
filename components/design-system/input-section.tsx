import { Search, Mail, Eye, EyeOff } from 'lucide-react';
import { Section, DemoBlock } from './section';
import { Input, InputWithIcon } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function InputSection() {
  return (
    <Section
      id="inputs"
      title="Input"
      description="Text inputs, textareas, labels, and inputs with leading/trailing icons."
    >
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <DemoBlock label="Default Input">
            <Input placeholder="Enter your name" className="w-full" />
          </DemoBlock>
          <DemoBlock label="Disabled Input">
            <Input placeholder="Disabled" disabled className="w-full" />
          </DemoBlock>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <DemoBlock label="With Leading Icon">
            <InputWithIcon
              placeholder="Search courses..."
              icon={<Search className="h-4 w-4" />}
              className="w-full"
            />
          </DemoBlock>
          <DemoBlock label="With Trailing Icon">
            <InputWithIcon
              placeholder="Email address"
              icon={<Mail className="h-4 w-4" />}
              iconPosition="right"
              className="w-full"
            />
          </DemoBlock>
        </div>

        <DemoBlock label="With Label">
          <div className="w-full max-w-sm space-y-2">
            <Label htmlFor="course-name">Course Name</Label>
            <Input
              id="course-name"
              placeholder="Introduction to Computer Science"
            />
          </div>
        </DemoBlock>

        <DemoBlock label="Textarea">
          <Textarea
            placeholder="Write a course description..."
            className="w-full max-w-md"
          />
        </DemoBlock>

        <DemoBlock label="Form Example">
          <div className="w-full max-w-md space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <InputWithIcon
                id="email"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="h-4 w-4" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <InputWithIcon
                id="password"
                type="password"
                placeholder="••••••••"
                icon={<Eye className="h-4 w-4" />}
                iconPosition="right"
              />
            </div>
          </div>
        </DemoBlock>
      </div>
    </Section>
  );
}
