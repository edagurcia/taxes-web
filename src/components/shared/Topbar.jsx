import { Logo } from "./Logo";
import { Avatar } from "./Avatar";
import { Navbar } from "./Navbar";

export const Topbar = () => {
  return (
    <nav className="flex items-center justify-between py-4">
      <Logo />
      <Navbar />
      <Avatar />
    </nav>
  );
};
