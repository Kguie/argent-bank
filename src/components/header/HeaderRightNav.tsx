import { useLocation, useNavigate } from "react-router-dom";

type HeaderRightNavItemProps = {
  label: string;
  onCLick: () => void;
  iconClass: string;
};

export default function HeaderRightNav(): React.ReactElement {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleSignOut(): void {
    console.log("disconnect");
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

  if (pathname.toLowerCase().includes("user")) {
    return (
      <div className="header-nav__wrapper">
        <HeaderRightNavItem
          label={"Tony"}
          onCLick={() => navigate("/user")}
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
        onCLick={() => navigate("/sign-in")}
        iconClass={"fa fa-user-circle"}
      />
    </div>
  );
}
