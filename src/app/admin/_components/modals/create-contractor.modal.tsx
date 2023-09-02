import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { createContractor } from "@/api/contractor";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Too short" }),
  lastName: z.string().min(2, { message: "Too short" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().min(2, { message: "Too short" }),
});

export default function CreateContractorModal() {
  const contractor = useMutation({
    mutationKey: ["createContractor"],
    mutationFn: createContractor,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await contractor.mutateAsync(values);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {contractor.isLoading ?? "loading.."} Add contractor
        </DialogTitle>
        <DialogDescription className="text-primary">
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John" {...field} />
                  </FormControl>

                  {form.formState.errors.firstName ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      This is the first name of the contractor.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Doe" {...field} />
                  </FormControl>
                  {form.formState.errors.lastName ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      This is the last name of the contractor.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.email ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      This is the email of the contractor.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="+36 30 123 4567"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.phone ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      This is the phone number of the contractor.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                className="mr-2 mb-2"
                variant="secondary"
                onClick={() => {
                  console.log("cancel");
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="mr-2 mb-2"
                variant="default"
                onClick={() => {
                  console.log("cancel");
                }}
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  );
}
