'use client';

import { GraduationCap, Send, AlertCircle } from 'lucide-react';
import { Section, DemoBlock } from './section';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ModalSection() {
  return (
    <Section
      id="modal"
      title="Modal"
      description="Dialogs for confirmations, forms, and focused interactions."
    >
      <div className="space-y-6">
        <DemoBlock label="Basic Modal">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Modal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Welcome to EduBridge!</DialogTitle>
                <DialogDescription>
                  Join thousands of learners advancing their skills with
                  expert-led courses.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-4 rounded-lg bg-primary/5 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Over 500+ courses available
                  </p>
                  <p className="text-xs text-muted-foreground">
                    From beginner to advanced levels
                  </p>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Maybe later</Button>
                </DialogClose>
                <Button>Get started</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DemoBlock>

        <DemoBlock label="Form Modal">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="accent">Invite Teacher</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite a teacher</DialogTitle>
                <DialogDescription>
                  Send an invitation email to bring a new educator on board.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="teacher-name">Full Name</Label>
                  <Input id="teacher-name" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher-email">Email Address</Label>
                  <Input
                    id="teacher-email"
                    type="email"
                    placeholder="jane@school.edu"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button className="gap-2">
                  <Send className="h-4 w-4" /> Send Invite
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DemoBlock>

        <DemoBlock label="Confirmation Modal">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Course</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <DialogTitle>Delete this course?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. All enrolled students will be
                  notified and all course materials will be permanently removed.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive">Yes, delete course</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DemoBlock>
      </div>
    </Section>
  );
}
