interface LoaderProp {
    message: string;
  }
  
  export default function Loader({ message }: LoaderProp) {
    return (
      <span className="my-4 flex flex-col items-center justify-center gap-2">
        <span className="text-sm">{message}</span>
        <span className="loading loading-bars loading-xl"></span>
      </span>
    );
  }
  