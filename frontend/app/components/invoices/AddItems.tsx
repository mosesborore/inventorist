"use client";
import React, { useState } from "react";

function AddItems() {
  const [items, setItems] = useState([]);
  const [itemsTotal, setItemsTotal = useState(0)];

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);

  return (
    <section className="border-base-300 my-2 flex w-full flex-col border p-3 shadow-md lg:flex-row">
      <div className="bg-base-100 border-base-300 border-r lg:flex-1/2">
        <div className="w-fit font-semibold">Add Item to Invoice </div>
        <div className="text-sm">
          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Description</legend>
            <input
              type="text"
              className="input"
              placeholder="Product Name or Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Quantity</legend>
            <input
              type="text"
              className="input"
              placeholder="Product Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Unit Price</legend>
            <input
              type="text"
              className="input"
              placeholder="Unit Price"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
            <div className="mt-2 flex items-center">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  const itemTotal = quantity * unitPrice;

                  setCurrentTotal((t) => t + itemTotal);

                  const item = {
                    description,
                    quantity,
                    unitPrice,
                    total: itemTotal,
                  };

                  console.log(item, items);
                }}
              >
                Add Item
              </button>
            </div>
            s
          </fieldset>
        </div>
      </div>
      <div className="divider divider-horizontal lg:divider-vertical"></div>
      <ul className="list bg-base-100 rounded-box lg:flex-3/4">
        <li className="text-muted p-4 pb-2 text-xs font-semibold tracking-wide">
          Items for invoice #331dddd
        </li>
        <li className="list-row">
          <div className="text-4xl font-thin tabular-nums opacity-30">01</div>
          <div></div>
          <div className="list-col-grow">
            <div>Dio Lupa</div>
            <div className="text-xs font-semibold uppercase opacity-60">
              Remaining Reason
            </div>
          </div>
          <button className="btn btn-square btn-ghost">
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 3L20 12 6 21 6 3z"></path>
              </g>
            </svg>
          </button>
        </li>
      </ul>
    </section>
  );
}

export default AddItems;
