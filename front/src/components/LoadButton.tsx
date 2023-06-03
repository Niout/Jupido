import { ClipLoader } from "react-spinners";

interface LoadButtonProps {
  onClick?: () => void;
  isLoading: boolean;
  className?: string;
  loaderColor?: string;
  children?: any;
  loaderWidth?: number;
  loaderHeight?: number;
  isDisabled?: boolean;
  size?: number;
}

function LoadButton({
  onClick,
  isLoading,
  className,
  loaderColor,
  children,
  isDisabled,
  size,
}: LoadButtonProps) {
  return (
    <button
      className={
        className +
        " outline-none focus:outline-none" +
        (isDisabled ? " cursor-not-allowed" : " cursor-pointer")
      }
      onClick={() => {
        if (isDisabled) return;
        if (!isLoading && onClick) {
          onClick();
        }
      }}
    >
      {isLoading ? (
        <ClipLoader color={loaderColor} size={size} />
      ) : (
        <>{children}</>
      )}
    </button>
  );
}

export default LoadButton;
