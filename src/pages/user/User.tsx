import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserHeader from "../../components/user/userHeader/UserHeader";
import UserAccount from "../../components/user/userAccount/UserAccount";
import { selectUserInfos, useAppSelector } from "../../utils/hooks/selectors";

export default function User(): React.ReactElement {
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfos = useAppSelector(selectUserInfos);

  const AccountsArray = (): React.ReactNode =>
    MOCKED_ACCOUNTS.map(({ title, description, amount }) => (
      <UserAccount
        key={title}
        title={title}
        amount={amount}
        description={description}
      />
    ));

  useEffect(() => {
    if (id && userInfos && id !== userInfos.id)
      navigate("/profile/" + userInfos.id);
  }, [id, navigate, userInfos]);

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
