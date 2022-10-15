import React, { useState, useEffect } from "react";
import MainLayout from "../Layout/MainLayout";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const Articulos = () => {
  const baseUrl = "https://compras-apec.herokuapp.com/articulos";
  const unidadMedidaUrl = "https://compras-apec.herokuapp.com/unidadesmedidas";
  const [articulo, setArticulo] = useState([]);
  const [unidadMedida, setUnidadMedida] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [loader, setLoader] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    descripcion: "",
    marca: "",
    id_Unidad_Medida: 0,
    existencia: "",
    estado: false,
  });

  const refresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleChange = (e) => {
    const type = e.target.getAttribute("type");
    let { name, value } = e.target;
    if (type === "number") {
      value = Number(value);
    } else if (type === "checkbox") {
      value = e.target.checked;
    }
    const newSelection = {
      ...gestorSeleccionado,
      [name]: value,
    };
    setGestorSeleccionado(newSelection);
  };

  const peticionGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      setArticulo(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoader(true);
  };

  const peticionGetUnidadMedida = async () => {
    try {
      const response = await axios.get(unidadMedidaUrl);
      setUnidadMedida(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const peticionPost = async () => {
    try {
      const response = await axios.post(baseUrl, gestorSeleccionado);
      setArticulo(articulo.concat(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const peticionPut = async () => {
    try {
      const response = await axios.put(
        baseUrl + "/" + gestorSeleccionado.id_Articulo,
        gestorSeleccionado
      );
      var respuesta = response.data;
      var dataAuxiliar = articulo;
      dataAuxiliar.map((gestor) => {
        if (gestor.id_Articulo === gestorSeleccionado.id_Articulo) {
          gestor.descripcion = respuesta.descripcion;
          gestor.marca = respuesta.marca;
          gestor.unidad_Medida = respuesta.unidad_Medida;
          gestor.existencia = respuesta.existencia;
          gestor.estado = respuesta.estado;
        }
        return null;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const peticionDelete = (x) =>
    axios
      .delete(baseUrl + "/" + x.id_Articulo)
      .then((response) => {
        setArticulo(
          articulo.filter((gestor) => gestor.id_Articulo !== response.data)
        );
      })
      .catch((error) => {
        console.log(error);
      });

  useEffect(() => {
    peticionGet();
    peticionGetUnidadMedida();
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
                  Agregar articulo
                </p>
              </div>
              {loader ? (
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
                          Descripción
                        </Th>
                        <Th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Marca
                        </Th>
                        <Th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          U/M
                        </Th>
                        <Th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Existencia
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
                      {articulo.map((gestor) => (
                        <Tr key={gestor.id_Articulo} className="mt-10">
                          <Td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {gestor.id_Articulo}
                                </div>
                              </div>
                            </div>
                          </Td>
                          <Td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {gestor.descripcion}
                            </div>
                          </Td>
                          <Td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {gestor.marca}
                            </div>
                          </Td>
                          <Td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {gestor.id_Unidad_Medida}
                            </div>
                          </Td>
                          <Td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {gestor.existencia}
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
              ) : (
                <div class="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
                  <div class="border-t-transparent border-solid animate-spin rounded-full border-blue-600 border-r-8 border-t-8 h-32 w-32"></div>
                </div>
              )}
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
              <h3 className="font-semibold text-lg">Insertar Articulo</h3>
            </div>
            <div className="m-7 p-3">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Descripcion:
              </label>
              <input
                type="text"
                name="descripcion"
                onChange={handleChange}
                value={gestorSeleccionado.descripcion}
                className="w-full my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Marca:
              </label>
              <input
                type="text"
                name="marca"
                onChange={handleChange}
                value={gestorSeleccionado.marca}
                className="w-full my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
              <label className="my-3 block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Unidad medida:
              </label>
              <select
                name="id_Unidad_Medida"
                className="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
                type="number"
              >
                <option value="">N/A</option>
                {unidadMedida.map((unidad) => (
                  <option
                    key={unidad.id_Unidad_Medida}
                    value={unidad.id_Unidad_Medida}
                  >
                    {unidad.descripcion}
                  </option>
                ))}
              </select>
              <label className="my-3 block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Existencia
              </label>
              <input
                type="number"
                name="existencia"
                onChange={handleChange}
                min={0}
                value={gestorSeleccionado.existencia}
                className="w-full my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
              <label className="my-3 block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Estado
              </label>
              <input
                type="checkbox"
                name="estado"
                onChange={handleChange}
                checked={gestorSeleccionado.estado}
                className="my-3"
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
                    id_Articulo: 0,
                    descripcion: "",
                    marca: "",
                    unidad_Medida: "",
                    existencia: 0,
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

export default Articulos;
