import { memo, MemoExoticComponent } from "react";

import UserHeader from "../../components/user/userHeader/UserHeader";
import UserAccount from "../../components/user/userAccount/UserAccount";

export default function User(): React.ReactElement {
  const AccountsArray: MemoExoticComponent<
    () => React.ReactElement<any, any> | null
  > = memo(() => (
    <>
      {MOCKED_ACCOUNTS.map(({ title, description, amount }) => (
        <UserAccount
          key={title}
          title={title}
          amount={amount}
          description={description}
        />
      ))}
    </>
  ));

  return (
    <main className="user">
      <UserHeader />
      <h2 className="sr-only">Accounts</h2>
      <AccountsArray />
    </main>
  );
}

const MOCKED_ACCOUNTS = [
  {
    title: "Argent Bank Checking (x8349)",
    description: "Available Balance",
    amount: "$2,082.79",
  },
  {
    title: "Argent Bank Savings (x6712)",
    description: "Available Balance",
    amount: "$10,928.42",
  },
  {
    title: "Argent Bank Credit Card (x8349)",
    description: "Current Balance",
    amount: "$184.30",
  },
];
