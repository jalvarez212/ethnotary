"use client";

import { Button } from "@/src/app/components/ui/button";
import { useToast } from "@/src/app/hooks/use-toast";
import React from "react";

const ToastDemo: React.FC = () => {
  const { toasts, dismiss, toast } = useToast();

  const handleAddToast = () => {
    toast({
      title: "New Toast",
      description: "This is a new toast notification.",
    });
  };

  const handleUpdateToast = () => {
    // Add a toast and store its ID
    const toastInstance = toast({
      title: "Processing...",
      description: "This toast will be updated shortly.",
    });

    // Update the toast after 2 seconds using its ID
    setTimeout(() => {
      toastInstance.update({
        id: toastInstance.id, // Pass the ID here
        title: "Updated!",
        description: "This toast has been updated.",
      });
    }, 2000);
  };

  const handleDismissToast = () => {
    // Add a toast and store its ID
    const toastInstance = toast({
      title: "Dismiss Me",
      description: "This toast will be dismissed manually.",
    });

    // Dismiss the toast after 3 seconds using its ID
    setTimeout(() => {
      toastInstance.dismiss();
    }, 3000);
  };

  const handleToastWithAction = () => {
    toast({
      title: "Action Toast",
      description: "This toast has an action Button.",
      action: (
        <Button
          onClick={() => alert("Action performed!")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Click Me
        </Button>
      ),
    });
  };

  const handleDismissAllToasts = () => {
    toast({
      title: "Multiple Toasts",
      description: "This is the first toast.",
    });

    toast({
      title: "Another Toast",
      description: "This is the second toast.",
    });

    // Dismiss all active toasts after 4 seconds
    setTimeout(() => {
      dismiss(); // Dismiss all toasts
    }, 4000);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Toast Demo</h1>
      <div className="space-y-2">
        <Button
          onClick={handleAddToast}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Toast
        </Button>
        <Button
          onClick={handleUpdateToast}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Update Toast
        </Button>
        <Button
          onClick={handleDismissToast}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Dismiss Toast
        </Button>
        <Button
          onClick={handleToastWithAction}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Toast with Action
        </Button>
        <Button
          onClick={handleDismissAllToasts}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Dismiss All Toasts
        </Button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Active Toasts</h2>
        <div className="space-y-2 mt-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className="p-4 border rounded shadow-md bg-white flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{t.title}</h3>
                <p>{t.description}</p>
              </div>
              {t.action && <div className="ml-4">{t.action}</div>}
              <Button
                onClick={() => dismiss(t.id)}
                className="ml-4 px-2 py-1 bg-red-400 text-white rounded"
              >
                Close
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToastDemo;
