import { Circles } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Circles color="#18181B" height={50} width={200} className="m-5" />
      <p className="px-2 text-lg text-center text-gray-900">{message}</p>
    </div>
  );
};

export default Spinner;
