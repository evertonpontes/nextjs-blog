"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTransition } from "react";

const formSchema = z.object({
  name: z.string().min(1).min(3).max(80),
  email: z.string(),
  message: z.string(),
});

export function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        console.log(values);
        toast("Message sent successfully");
      } else {
        console.error("Form submission error");
        toast.error("Failed to submit message. Please try again.");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base md:text-sm">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jhon Doe"
                  type="text"
                  className="h-16 md:h-12 text-base md:text-sm"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base md:text-sm">email</FormLabel>
              <FormControl>
                <Input
                  placeholder="jhon.doe@example.com"
                  type="email"
                  className="h-16 md:h-12 text-base md:text-sm"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base md:text-sm">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your message here..."
                  className="min-h-48 md:min-h-32 text-base md:text-sm not-md:resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full md:w-auto text-base md:text-sm h-12 md:h-10"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "SendSend message"}
        </Button>
      </form>
    </Form>
  );
}
