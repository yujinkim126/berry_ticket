const Header = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-grey-darkest bg-black p-6 fixed w-full z-10 pin-t">
      <div className="flex items-center flex-no-shrink text-white mr-6">
        <a
          className="text-black no-underline hover:text-white hover:no-underline"
          href="#"
        >
          <span className="text-2xl pl-2">
            <i className="em em-grinning"></i> Brand McBrandface
          </span>
        </a>
      </div>

      <div className="block lg:hidden">
        <button
          id="nav-toggle"
          className="flex items-center px-3 py-2 border rounded text-grey border-grey-dark hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0"
        id="nav-content"
      >
        <ul className="list-reset lg:flex justify-end flex-1 items-center">
          <li className="mr-3">
            <a
              className="inline-block py-2 px-4 text-white no-underline"
              href="#"
            >
              Active
            </a>
          </li>
          <li className="mr-3">
            <a
              className="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4"
              href="#"
            >
              link
            </a>
          </li>
          <li className="mr-3">
            <a
              className="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4"
              href="#"
            >
              link
            </a>
          </li>
          <li className="mr-3">
            <a
              className="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4"
              href="#"
            >
              link
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Header;
