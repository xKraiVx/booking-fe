import type { JSX } from "react/jsx-runtime";


type LoaderProps = {
  message?: string;
}

export default function Loader({ message }: LoaderProps): JSX.Element {

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-lg">{message || "Loading..."}</p>
      </div>
    </div>
  );
}
