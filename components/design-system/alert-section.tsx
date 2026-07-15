import {
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Terminal,
} from 'lucide-react';
import { Section, DemoBlock } from './section';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function AlertSection() {
  return (
    <Section
      id="alerts"
      title="Alert"
      description="Five variants for contextual feedback messages."
    >
      <div className="space-y-4">
        <DemoBlock label="Variants">
          <div className="w-full space-y-3">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the CLI.
              </AlertDescription>
            </Alert>

            <Alert variant="success">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Course completed!</AlertTitle>
              <AlertDescription>
                You&apos;ve successfully finished all modules. Your certificate
                is ready to download.
              </AlertDescription>
            </Alert>

            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Subscription expiring</AlertTitle>
              <AlertDescription>
                Your premium subscription expires in 3 days. Renew to keep
                access.
              </AlertDescription>
            </Alert>

            <Alert variant="info">
              <Info className="h-4 w-4" />
              <AlertTitle>New feature available</AlertTitle>
              <AlertDescription>
                We&apos;ve added AI-powered course recommendations. Check them
                out in your dashboard.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Enrollment failed</AlertTitle>
              <AlertDescription>
                This course has reached maximum capacity. Try again next
                semester.
              </AlertDescription>
            </Alert>
          </div>
        </DemoBlock>
      </div>
    </Section>
  );
}
