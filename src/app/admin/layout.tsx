"use client";
import { Toaster } from "react-hot-toast";
import AdminNavigation from "./_components/navigation";

export default function Layout({ children }: { children: any }) {
  return (
    <main>
      <AdminNavigation />
      <div className="mx-auto min-w-[80%] p-8 py-4 max-w-[750px]">
        {children}
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--text))",
            },
            success: {
              style: {
                background: "hsl(var(--background))",
                border: "1px solid green",
              },
            },
          }}
        />
      </div>
    </main>
  );
}
