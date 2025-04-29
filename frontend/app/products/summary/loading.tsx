// interface LoaderProp {
//   message: string;
// }

export default function Loading() {
  return (
    <span className="my-4 flex flex-col items-center justify-center gap-2">
      <span className="text-sm">Loading</span>
      <span className="loading loading-dots loading-xl"></span>
    </span>
  );
}
