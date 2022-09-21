import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import Dropdown from "./Dropdown";
import { Transition } from "@headlessui/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 px-10">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex-shrink-0 flex items-center pr-10">
                <Link to="/">
                  <h1 className="text-white text-3xl">CTG</h1>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <Link
                  to="/"
                  className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Inicio
                </Link>

                <Link
                  to="/sobrenosotros"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sobre nosotros
                </Link>
                <Dropdown name="Compras">
                  <div className="absolute mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2 z-50">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        <Link
                          to="/articulos"
                          className="text-base font-medium text-gray-900 -m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                        >
                          <svg
                            className="flex-shrink-0 h-6 w-6 text-indigo-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                          <div className="ml-4">
                            Artículos
                            <p className="mt-1 text-sm text-gray-500">
                              Obtenga una mejor comprensión de dónde proviene su
                              tráfico.
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/departamentos"
                          className="text-base font-medium text-gray-900 -m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                        >
                          <svg
                            className="flex-shrink-0 h-6 w-6 text-indigo-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                            />
                          </svg>
                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900">
                              Departamentos
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              Hable directamente con sus clientes de una forma
                              más de manera significativa.
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/proveedores"
                          className="text-base font-medium text-gray-900 -m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                        >
                          <svg
                            className="flex-shrink-0 h-6 w-6 text-indigo-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900">
                              Proveedores
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              Los datos de su cliente estarán seguros y
                              protegidos.
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/ordencompra"
                          className="text-base font-medium text-gray-900 -m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                        >
                          <svg
                            className="flex-shrink-0 h-6 w-6 text-indigo-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            />
                          </svg>
                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900">
                              Ordenes de compra
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              Conéctese con herramientas de terceros que ya está
                              utilizando.
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/unidadesmedida"
                          className="text-base font-medium text-gray-900 -m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                        >
                          <svg
                            className="flex-shrink-0 h-6 w-6 text-indigo-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900">
                              Unidades de medida
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              Cree embudos estratégicos que impulsarán a sus
                              clientes a convertir
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Dropdown>
                <Link
                  to="/asientos"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Asientos contables
                </Link>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Inicio
              </Link>

              <Link
                to="/sobrenosotros"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Sobre nosotros
              </Link>

              <Link
                to="ordencompra"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Ordenes de compra
              </Link>

              <Link
                to="/departamentos"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Departamentos
              </Link>

              <Link
                to="/articulos"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Artículos
              </Link>

              <Link
                to="/unidadesmedida"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Unidades de medida
              </Link>

              <Link
                to="/proveedores"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Proveedores
              </Link>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};

export default Navbar;
