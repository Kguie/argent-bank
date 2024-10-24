type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  isLoading?: boolean;
};

export default function Button({
  label,
  isLoading,
  ...props
}: ButtonProps): React.ReactElement {
  const buttonClassList: string =
    "button" + (isLoading ? " button--loading" : "");

  const Loader = (): React.ReactElement | null =>
    isLoading ? (
      <div data-testid="button-spinner">
        <i className="fa-solid fa-spinner"></i>
      </div>
    ) : null;

  return (
    <button disabled={isLoading} className={buttonClassList} {...props}>
      <Loader />
      {label}
    </button>
  );
}
