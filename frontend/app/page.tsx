import Image from "next/image";

export default async function Home() {
  //   const res = await fetch("http://127.0.0.1:8000/api/products/", {
  //     // cache: "no-store",
  //     next: { revalidate: 10 },
  //   });
  //   const products = await res.json();
  return (
    <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-3">
      <div className="rounded-lg">
        <div className="relative">
          <Image
            src="/images/Screenshot_20230421-213439.png"
            alt="images"
            height={400}
            width={400}
            className="sticky rounded-lg"
          />
          <div className="absolute bottom-0 h-20 w-full text-white backdrop-brightness-85">
            <div className="p-2 tracking-wide">
              <span className="block font-bold">Maserati</span>
              <span className="text-xs">Epitome of Elegance and Human enginuity</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="relative">
          <Image
            src="/images/Screenshot_20250414-071145.png"
            alt="images"
            height={400}
            width={400}
            className="sticky rounded-lg"
          />
          <div className="absolute bottom-0 h-20 w-full font-bold text-white backdrop-brightness-85">
            <div className="p-2 tracking-wide">
              <span>BMW DropTop</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="relative">
          <Image
            src="/images/Screenshot_20230421-213803.png"
            alt="images"
            height={400}
            width={400}
            className="sticky rounded-lg"
          />
          <div className="absolute bottom-0 h-20 w-full font-bold text-white backdrop-brightness-85">
            <div className="p-2 tracking-wide">
              <span>BMW X7s</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="relative">
          <Image
            src="/images/Screenshot_20241017-171134.png"
            alt="images"
            height={400}
            width={400}
            className="sticky rounded-lg"
          />
          <div className="absolute bottom-0 h-20 w-full rounded-t-lg font-bold text-white backdrop-brightness-70">
            <div className="p-2 tracking-wide">
              <span>BMW X7s</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/images/Screenshot_20250414-071041.png"
          alt="images"
          height={400}
          width={400}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
