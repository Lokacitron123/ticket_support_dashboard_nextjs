"use client";

import { useActionState, useEffect } from "react";
import { createTicket, TicketFormState } from "@/actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const NewTicketForm = () => {
  const initialState: TicketFormState = {
    success: false,
    message: "",
    error: "",
    fieldErrors: {
      subject: "",
      description: "",
      priority: "",
    },
  };
  const [state, formAction] = useActionState(createTicket, initialState);

  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);

      router.push("/tickets");
    }
  }, [state.message, router]);

  return (
    <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-200'>
      <h1 className='text-3xl font-bold mb-6 text-center text-blue-600'>
        Submit a Support Ticket
      </h1>

      {!state.success && state.fieldErrors && (
        <div className='text-red-500 mb-4 text-center'>
          {Object.entries(state.fieldErrors).map(
            ([field, message]) => message && <p key={field}>{message}</p>
          )}
        </div>
      )}

      {!state.success && state.error && (
        <div className='text-red-500 mb-4 text-center'>
          <p>{state.error}</p>
        </div>
      )}

      {/* {state.success && state.message && (
        <div className='text-green-500 mb-4 text-center'>
          <p>
            {state.message} {state.success}
          </p>
        </div>
      )} */}

      <form action={formAction} className='space-y-4 text-gray-700'>
        <label htmlFor='subject' className='sr-only'>
          Type in your subject
        </label>
        <input
          id='subject'
          className='w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
          type='text'
          name='subject'
          placeholder='Subject'
          required
        />

        <label htmlFor='description' className='sr-only'>
          Describe your issue.{" "}
        </label>
        <textarea
          id='description'
          className='w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
          name='description'
          placeholder='Describe your issue'
          rows={4}
          required
        />

        <label htmlFor='priority' className='sr-only'>
          Select priority
        </label>
        <select
          id='priority'
          className='w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700'
          name='priority'
          defaultValue='Low'
          required
        >
          <option value='Low'>Low Priority</option>
          <option value='Medium'>Medium Priority</option>
          <option value='High'>High Priority</option>
        </select>

        <button
          className='w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition disabled:opacity-50'
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  );
};
