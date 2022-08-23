import React, { useState, useEffect } from "react";
import MainLayout from "../Layout/MainLayout";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const Proveedores = () => {
  const baseUrl = "https://compras-apec.herokuapp.com/proveedores";
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    id_Proveedor: 0,
    cedula_RNC: "",
    nombre_Comercial: "",
    estado: true,
  });

  const refresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    if (type === "number") {
      value = Number(value);
    } else if (type === "checkbox") {
      value = e.target.checked;
    }
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value,
    });
  };

  const peticionGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const peticionPost = async () => {
    try {
      const response = await axios.post(baseUrl, gestorSeleccionado);
      setData(data.concat(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const peticionPut = async () => {
    try {
      const response = await axios.put(
        baseUrl + "/" + gestorSeleccionado.id_Proveedor,
        gestorSeleccionado
      );
      var respuesta = response.data;
      var dataAuxiliar = data;
      dataAuxiliar.map((gestor) => {
        if (gestor.id_Proveedor === gestorSeleccionado.id_Proveedor) {
          gestor.cedula_RNC = respuesta.cedula_RNC;
          gestor.nombre_Comercial = respuesta.nombre_Comercial;
          gestor.estado = respuesta.estado;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const peticionDelete = (x) =>
    axios
      .delete(baseUrl + "/" + x.id_Proveedor)
      .then((response) => {
        setData(data.filter((gestor) => gestor.id_Proveedor !== response.data));
      })
      .catch((error) => {
        console.log(error);
      });

  useEffect(() => {
    peticionGet();
  }, [refreshCount]);

  return (
    <MainLayout>
      <div className="px-10">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="absolute flex items-center justify-center rounded-md text-white">
                <img
                  src="add_circle_outline-24px.svg"
                  alt=""
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  className="cursor-pointer"
                />
                <p className="ml-12 text-lg leading-6 font-medium text-gray-900">
                  Agregar proveedor
                </p>
              </div>

              <div className="shadow mt-12 overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Table className="w-full divide-y divide-gray-200">
                  <Thead className="bg-gray-50">
                    <Tr>
                      <Th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ID
                      </Th>
                      <Th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Cedula / RNC
                      </Th>
                      <Th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Nombre comercial
                      </Th>
                      <Th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Estado
                      </Th>
                      <Th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Operaciones
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((gestor) => (
                      <Tr key={gestor.id_Proveedor} className="mt-10">
                        <Td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {gestor.id_Proveedor}
                              </div>
                            </div>
                          </div>
                        </Td>
                        <Td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.cedula_RNC}
                          </div>
                        </Td>
                        <Td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.nombre_Comercial}
                          </div>
                        </Td>
                        <Td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={
                              gestor.estado
                                ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                            }
                          >
                            {gestor.estado ? "Activo" : "Inactivo"}
                          </span>
                        </Td>
                        <Td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                          <img
                            src="mode_edit-24px.svg"
                            alt=""
                            onClick={() => {
                              setIsOpen(!isOpen);
                              setGestorSeleccionado(gestor);
                              setIsEdit(true);
                            }}
                            className="cursor-pointer inline-block"
                          />

                          <img
                            src="delete_outline-24px.svg"
                            alt=""
                            onClick={() => {
                              peticionDelete(gestor);
                            }}
                            className="cursor-pointer inline-block"
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 " +
            (isOpen ? "hidden" : "")
          }
        >
          <div className="bg-white rounded shadow-lg w-10/12 md:w-1/3">
            <div className="border-b px-4 py-2 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Insertar proveedor</h3>
            </div>
            <div className="m-7 p-3">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Cedula / RNC
              </label>
              <input
                type="text"
                name="cedula_RNC"
                onChange={handleChange}
                value={gestorSeleccionado.cedula_RNC}
                className="w-full my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Nombre comercial{" "}
              </label>
              <input
                type="text"
                name="nombre_Comercial"
                onChange={handleChange}
                value={gestorSeleccionado.nombre_Comercial}
                className="w-full my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Estado
              </label>
              <input
                type="checkbox"
                name="estado"
                onChange={handleChange}
                checked={gestorSeleccionado.estado}
              />
            </div>
            <div className="flex justify-end items-center w-100 border-t p-3">
              <button
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                onClick={async () => {
                  isEdit ? await peticionPut() : await peticionPost();
                  setGestorSeleccionado({
                    id_Proveedores: 0,
                    cedula_RNC: "",
                    nombre_Comercial: "",
                    estado: false,
                  });
                  setIsEdit(false);
                  setIsOpen(true);
                  refresh();
                }}
              >
                Insertar
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Proveedores;
