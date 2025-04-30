"use client";

import React from "react";
import InputField from "./commons/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./commons/Button";
import {
  CreateInvoiceSchema,
  CreateInvoiceSchemaType,
} from "@/schemas/InvoiceSchema";
import Modal from "./commons/Modal";
import { buildURLWithBase } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface InvoiceModalProps {
  modalFormRef: React.RefObject<HTMLDialogElement | null>;
}
function InvoiceFormModal({ modalFormRef }: InvoiceModalProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateInvoiceSchemaType>({
    resolver: zodResolver(CreateInvoiceSchema),
    defaultValues: {
      total: 0,
    },
  });

  const onSubmit: SubmitHandler<CreateInvoiceSchemaType> = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = {
      buyer_name: formData.buyerName,
      buyer_phone: formData.buyerPhone,
      date: formData.date,
      due_date: formData.dueDate,
      total: formData.total,
      notes: formData.notes,
    };

    if (!formData.dueDate) {
      console.log(
        Object.entries(data).filter((e) => {
          return e[1] && true;
        }),
      );
    }

    const url = buildURLWithBase("/invoices/");
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const respData = (await resp.json()) as {
      created: boolean;
      invoiceNumber?: number;
      message: string;
    };
    if (resp.ok && respData.created) {
      reset();
      modalFormRef.current?.close();
      router.push(`/invoices/${respData.invoiceNumber}`);
      toast.success(respData.message);

      console.log({ description: "ok" }, respData);
    } else {
      console.log({ description: `Not OK ${resp.status}` });
    }
  };

  return (
    <>
      <Modal modalRef={modalFormRef}>
        <h3 className="mb-2 text-lg font-bold">Create Invoice</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
            <legend className="fieldset-legend">Buyer Details</legend>
            <InputField
              id="buyerName"
              label="Buyer's Name"
              errors={errors}
              placeholder="Enter Buyer's Name"
              register={register}
            />
            <InputField
              id="buyerPhone"
              label="Buyer's Phone Number"
              errors={errors}
              placeholder="Enter Buyer's Phone Number"
              register={register}
            />
          </fieldset>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
            <legend className="fieldset-legend">Invoice Details</legend>
            <InputField
              id="date"
              label="Date"
              type="date"
              errors={errors}
              placeholder="Enter Invoice Date"
              register={register}
            />
            <InputField
              id="dueDate"
              label="Due Date"
              type="date"
              errors={errors}
              placeholder="Enter Quantity"
              register={register}
            />

            <InputField
              id="total"
              label="Total"
              type="number"
              errors={errors}
              placeholder="Enter Total"
              register={register}
            />
            <InputField
              id="notes"
              label="Notes"
              type="text"
              errors={errors}
              placeholder="Enter remarks, if necessary"
              register={register}
            />
          </fieldset>

          <div>
            <Button
              label={isSubmitting ? "Submitting..." : "Create Invoice"}
              type="submit"
              className="btn btn-secondary my-4"
              small
              disabled={isSubmitting}
            ></Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default InvoiceFormModal;
