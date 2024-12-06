import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-slate-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>

          <div className="flex items-center gap-8 font-medium">
            <Link href="/">Home</Link>
            <Link href="/">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
