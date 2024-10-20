import { memo, MemoExoticComponent, useMemo } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  isLoading?: boolean;
};

export default function Button({
  label,
  isLoading,
  ...props
}: ButtonProps): React.ReactElement {
  const Loader: MemoExoticComponent<() => React.ReactElement<any, any> | null> =
    memo(() => (
      <>
        {isLoading ? (
          <div>
            <i className="fa-solid fa-spinner"></i>
          </div>
        ) : null}
      </>
    ));

  const buttonClassList: string = useMemo(
    () => "button" + (isLoading ? " button--loading" : ""),
    [isLoading]
  );

  return (
    <button disabled={isLoading} className={buttonClassList} {...props}>
      <Loader />
      {label}
    </button>
  );
}
