import { EduNavbar } from '@/components/ui/edu-navbar';
import { EduFooter } from '@/components/ui/edu-footer';
import { marketingNavItems, footerSections } from '@/config/navigation';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <EduNavbar items={marketingNavItems} />
      <main className="flex-1">{children}</main>
      <EduFooter sections={footerSections} />
    </div>
  );
}
