import { Logo } from "./Logo";
import { Avatar } from "./Avatar";

export const Topbar = () => {
  return (
    <nav className="flex items-center justify-between py-4">
      <Logo />

      <Avatar />
    </nav>
  );
};
