import { Users, Clock, Award, TrendingUp, MoreHorizontal } from 'lucide-react';
import { Section, DemoBlock } from './section';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function CardSection() {
  return (
    <Section
      id="cards"
      title="Card"
      description="Five variants: default, elevated, outlined, filled, and gradient."
    >
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>A clean, standard card.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Used for most content containers.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Shadow lifts on hover.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Great for interactive elements.
              </p>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
              <CardDescription>Thicker border emphasis.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                When you want a bolder frame.
              </p>
            </CardContent>
          </Card>

          <Card variant="filled">
            <CardHeader>
              <CardTitle>Filled Card</CardTitle>
              <CardDescription>Subtle background fill.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                For grouped or nested content.
              </p>
            </CardContent>
          </Card>

          <Card variant="gradient">
            <CardHeader>
              <CardTitle>Gradient Card</CardTitle>
              <CardDescription>Soft brand gradient.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Perfect for featured content.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Real-world example */}
        <DemoBlock label="Course Card Example">
          <Card variant="elevated" className="w-full max-w-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge variant="success">Active</Badge>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              <CardTitle className="mt-2">
                Introduction to Web Development
              </CardTitle>
              <CardDescription>
                Learn HTML, CSS, and JavaScript from scratch.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> 1,243
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> 12h
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="h-4 w-4" /> Cert
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">68%</span>
                </div>
                <Progress value={68} color="success" />
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button className="flex-1">Continue</Button>
              <Button variant="outline" size="icon">
                <TrendingUp className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </DemoBlock>
      </div>
    </Section>
  );
}
