import NavLink from '@/components/NavLink';

const ROUTES: any = [
  { name: 'Home', path: '/', exact: true },
  // { name: "About", path: "/about" },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Projects', path: '/projects' }
];

function Navbar() {
  return (
    <div className="sticky top-0 z-[100] h-[10vh] backdrop-blur-sm transition-all duration-100 ease-in-out flex flex-col justify-center">
      <div className="mx-8 flex flex-row items-start">
        <nav className="text-primary max-w-[75ch] lg:max-w-[150ch] flex items-center justify-between">
          <ul className="flex">
            {ROUTES.map((route: any) => (
              <li className="first:pl-0 px-2 py-2 md:px-3 lg:px-4 2xl:px-6" key={route.name}>
                <NavLink
                  to={route.path}
                  exact={route.exact}
                  className="text-gray-400 underlined focus:outline-none block whitespace-nowrap lg:text-lg 2xl:text-xl 4xl:text-2xl  hover:text-gray-100 focus:text-gray-100 duration-75"
                  activeClassName="font-medium !text-gray-200"
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
