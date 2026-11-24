import { Link, useLocation } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";

export default function Navbar() {
  const location = useLocation();
  const onHome = location.pathname === "/";

  return (
    <header className="w-full px-6 md:px-10 py-5 flex items-center justify-between">
      <Link
        to="/"
        className="focus-ring font-type text-sm md:text-base tracking-wide text-paper-ink/80 hover:text-paper-ink transition-colors"
      >
        omont.
      </Link>

      <Link
        to={onHome ? "/memories" : "/"}
        className="focus-ring flex items-center gap-1.5 text-xs font-mono tracking-wide text-paper-ink/60 hover:text-paper-ink transition-colors"
      >
        <PiBookOpenTextLight className="text-base" />
        {onHome ? "memories" : "back to typewriter"}
      </Link>
    </header>
  );
}
