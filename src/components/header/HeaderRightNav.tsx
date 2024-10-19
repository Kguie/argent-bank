import { useNavigate } from "react-router-dom";

import {
  selectUserInfos,
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/selectors";
import { logOut } from "../../features/authToken";
import { resetUserInfos } from "../../features/userInfos";

type HeaderRightNavItemProps = {
  label: string;
  onCLick: () => void;
  iconClass: string;
};

export default function HeaderRightNav(): React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userInfos = useAppSelector(selectUserInfos);

  function handleSignOut(): void {
    dispatch(logOut());
    dispatch(resetUserInfos());
    navigate("/");
  }

  const HeaderRightNavItem = ({
    label,
    onCLick,
    iconClass,
  }: HeaderRightNavItemProps): React.ReactElement => (
    <div
      data-testid="header-right-nav-item"
      className="header-nav__link__item header-nav__link"
      onClick={onCLick}>
      <i data-testid="header-right-nav-item__icon" className={iconClass}></i>
      <span>{label}</span>
    </div>
  );

  if (userInfos) {
    return (
      <div className="header-nav__wrapper">
        <HeaderRightNavItem
          label={userInfos.firstName}
          onCLick={() => navigate("/profile/" + userInfos.id)}
          iconClass={"fa fa-user-circle"}
        />
        <HeaderRightNavItem
          label={"Sign Out"}
          onCLick={handleSignOut}
          iconClass={"fa fa-sign-out"}
        />
      </div>
    );
  }

  return (
    <div>
      <HeaderRightNavItem
        label={"Sign In"}
        onCLick={() => navigate("/login")}
        iconClass={"fa fa-user-circle"}
      />
    </div>
  );
}
