import Button from "../../button/Button";

type UserAccountProps = {
  title: string;
  amount: string;
  description: string;
};

export default function UserAccount({
  title,
  amount,
  description,
}: UserAccountProps): React.ReactElement {
  return (
    <section className="account">
      <div className="account__content-wrapper">
        <h3 className="account__title">{title}</h3>
        <p className="account__amount">{amount}</p>
        <p className="account__amount-description">{description}</p>
      </div>
      <div className="account__button-wrapper">
        <Button label="View transactions" />
      </div>
    </section>
  );
}
