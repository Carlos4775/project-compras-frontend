import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import Dropdown from "./Dropdown";

const DarkNavbar = () => {
  return (
    <div>
      <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  class="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex-shrink-0 flex items-center">
                <img
                  class="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
                <img
                  class="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Workflow"
                />
              </div>
              <div class="hidden sm:block sm:ml-6">
                <div class="flex space-x-4">
                  <Link
                    to="/sobrenosotros"
                    aria-current="page"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sobre nosotros
                  </Link>
                  <Link
                    to="/contacto"
                    aria-current="page"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contacto
                  </Link>
                  <Dropdown name="Compras">
                    <div class="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                      <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <Link
                            to="/articulos"
                            class="text-base font-medium text-gray-900 -m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            <svg
                              class="flex-shrink-0 h-6 w-6 text-indigo-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                            <div class="ml-4">
                              Artículos
                              <p class="mt-1 text-sm text-gray-500">
                                Get a better understanding of where your traffic
                                is coming from.
                              </p>
                            </div>
                          </Link>

                          <Link
                            to="/departamentos"
                            class="text-base font-medium text-gray-900 -m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            <svg
                              class="flex-shrink-0 h-6 w-6 text-indigo-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                              />
                            </svg>
                            <div class="ml-4">
                              <p class="text-base font-medium text-gray-900">
                                Departamentos
                              </p>
                              <p class="mt-1 text-sm text-gray-500">
                                Speak directly to your customers in a more
                                meaningful way.
                              </p>
                            </div>
                          </Link>

                          <Link
                            to="/proveedores"
                            class="text-base font-medium text-gray-900 -m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            <svg
                              class="flex-shrink-0 h-6 w-6 text-indigo-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                            </svg>
                            <div class="ml-4">
                              <p class="text-base font-medium text-gray-900">
                                Proveedores
                              </p>
                              <p class="mt-1 text-sm text-gray-500">
                                Your customers&#039; data will be safe and
                                secure.
                              </p>
                            </div>
                          </Link>

                          <Link
                            to="/ordencompra"
                            class="text-base font-medium text-gray-900 -m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            <svg
                              class="flex-shrink-0 h-6 w-6 text-indigo-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                              />
                            </svg>
                            <div class="ml-4">
                              <p class="text-base font-medium text-gray-900">
                                Ordenes de compra
                              </p>
                              <p class="mt-1 text-sm text-gray-500">
                                Connect with third-party tools that you&#039;re
                                already using.
                              </p>
                            </div>
                          </Link>

                          <Link
                            to="/unidadesmedida"
                            class="text-base font-medium text-gray-900 -m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            <svg
                              class="flex-shrink-0 h-6 w-6 text-indigo-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                            <div class="ml-4">
                              <p class="text-base font-medium text-gray-900">
                                Unidades de medida
                              </p>
                              <p class="mt-1 text-sm text-gray-500">
                                Build strategic funnels that will drive your
                                customers to convert
                              </p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">View notifications</span>
                <a>Iniciar sesión</a>
              </button>

              <div class="ml-3 relative">
                <div>
                  <button class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span class="sr-only">View notifications</span>
                    <a>Registrase</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sm:hidden" id="mobile-menu">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/ordencompra"
              aria-current="page"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Ordenes de compra
            </Link>
            <Link
              to="/departamentos"
              aria-current="page"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Departamentos
            </Link>
            <Link
              to="/articulos"
              aria-current="page"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Artículos
            </Link>
            <Link
              to="/unidadesmedida"
              aria-current="page"
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
      </nav>
    </div>
  );
};

export default DarkNavbar;
