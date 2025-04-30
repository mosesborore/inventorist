"use client";
import React from "react";
import { FaAddressBook, FaUser, FaPhoneAlt } from "react-icons/fa";
import CreateSellerModal from "../seller/CreateSellerModal";
import { useGetSeller } from "@/queries";

function SellerCard() {
  const { data: seller } = useGetSeller();
  return (
    <div className="card bg-base-100 my-2 w-1/2 shadow-md">
      <div className="card-body">
        <h2 className="card-title">Seller Information</h2>
        {seller?.name ? (
          <div className="mt-2 flex flex-col space-y-2 text-xs font-semibold opacity-70">
            <span className="flex gap-1 capitalize">
              <FaUser /> {seller?.name}
            </span>
            <address className="flex gap-1">
              <FaAddressBook /> {seller.address}
            </address>
            <span className="flex gap-1">
              <FaPhoneAlt />
              {seller.phone}
            </span>
          </div>
        ) : (
          <div>
            <CreateSellerModal />
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerCard;
