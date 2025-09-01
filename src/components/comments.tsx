"use client";
import { useTransition } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  comment: z.string(),
  email: z.string(),
  nickname: z.string().min(3).max(80),
});

interface CommentsProps {
  id: string;
  uid: string;
  comments: {
    post_id: string;
    nickname: string;
    payload: string;
    created_at: string;
    id: string;
    published: boolean;
    email: string;
  }[];
}

export function Comments({ id, uid, comments }: CommentsProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await fetch(`/api/comments/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: id,
          ...values,
          uid,
        }),
      }).then(async (response) => {
        const data = await response.json();
        if (data.error) {
          console.error(data.error);
        } else {
          toast.success("Comment submitted successfully!");
          form.reset();
        }
      });
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
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-serif">Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your comment"
                  className="resize-none rounded-none"
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
              <FormLabel className="font-serif">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your email"
                  type="email"
                  className="rounded-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-serif">Nickname</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your nickname"
                  type="text"
                  className="rounded-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="font-serif rounded-none cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Send comment"}
        </Button>
      </form>
    </Form>
  );
}
