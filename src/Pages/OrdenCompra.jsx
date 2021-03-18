import axios from "axios";
import React, { useState, useEffect } from "react";
import MainLayout from "../Layout/MainLayout";

const OrdenCompra = () => {
  const baseUrl = "https://localhost:44348/api/ordencompras";
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionGet();
  }, []);
  return (
    <MainLayout>
      <div className="container mx-auto">
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Id Articulo
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Descripción
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Marca
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Unidad de Medida
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Existencia
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Estado
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Operaciones
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {data.map((gestor) => (
                      <tr key={gestor.id_Articulo}>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="ml-4">
                              <div class="text-sm font-medium text-gray-900">
                                {gestor.id_Articulo}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">
                            {gestor.descripcion}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">
                            {gestor.marca}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">
                            {gestor.unidad_Medida}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">
                            {gestor.existencia}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {gestor.estado}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <tr>
                            <td>
                              <img
                                src="wysiwyg-24px.svg"
                                alt=""
                                onClick={() => {
                                  setIsOpen(!isOpen);
                                }}
                                className="cursor-pointer"
                              />
                            </td>
                            <td>
                              <img
                                src="mode_edit-24px.svg"
                                alt=""
                                onClick={() => {
                                  setIsOpen(!isOpen);
                                }}
                                className="cursor-pointer"
                              />
                            </td>
                            <td>
                              <img
                                src="delete_outline-24px.svg"
                                alt=""
                                onClick={() => {
                                  setIsOpen(!isOpen);
                                }}
                                className="cursor-pointer"
                              />
                            </td>
                          </tr>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrdenCompra;
