type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export default function Button({ label, ...props }: ButtonProps) {
  return (
    <button className="button" {...props}>
      {label}
    </button>
  );
}
