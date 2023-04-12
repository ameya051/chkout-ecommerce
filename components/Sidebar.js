import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed z-50 top-0 left-0 p-2 text-white bg-gray-800 rounded-md md:hidden"
        onClick={toggleSidebar}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="currentColor" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <aside
        className={`fixed z-40 top-0 left-0 h-full bg-gray-800 text-white w-64 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Sidebar</h2>
        </div>
        <nav className="flex-grow">
          <ul className="p-4">
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">
                Link 1
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">
                Link 2
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">
                Link 3
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
