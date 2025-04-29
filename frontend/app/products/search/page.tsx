"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/commons/Loader";
import ProductSummaryList from "@/components/ProductSummaryList";
import { buildURLWithBase } from "@/lib/utils";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState("");

  useEffect(() => {
    const t = setTimeout(async () => {
      setIsLoading(true);
      try {
        if (searchTerm) {
          const url = buildURLWithBase(`/products/search?q=${searchTerm}`);
          console.log(url);
          const response = await fetch(url, {
            method: "GET",
          });
          const data = await response.json();
          setResults(data);
          setIsLoading(false);
          setError("");
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Something went wrong. Unable to Search");
        console.log(err);
      }
    }, 500);

    return () => clearTimeout(t);
  }, [searchTerm]);

  function handleChange(value: string) {
    setSearchTerm(value);
  }

  return (
    <section className="mx-2">
      <h1 className="border-b-1 py-4 text-2xl font-bold">Search Products </h1>
      <section className="mx-auto my-4 w-full max-w-lg">
        <fieldset className="fieldset mx-2 w-full">
          {/* <legend className="fieldset-legend text-base">Search Product</legend> */}

          <input
            type="text"
            className="input w-full border-1 focus:outline-none"
            placeholder="Search Product here"
            onChange={(e) => {
              handleChange(e.target.value);
            }}
          />
        </fieldset>
      </section>
      <div className="mx-auto w-full lg:max-w-6xl">
        {isLoading ? (
          <Loader message="Searching" />
        ) : results.length > 0 && searchTerm ? (
          <div>
            <p className="my-4 font-bold opacity-60">Search Results</p>
            <ProductSummaryList summaries={results} />
          </div>
        ) : isError ? (
          <div className="m-4 text-center font-bold text-red-500">
            {isError}
          </div>
        ) : (
          <div className="text-muted m-4 text-center font-bold">
            Products Not Found. Search for One
          </div>
        )}
      </div>
    </section>
  );
}

export default Search;
