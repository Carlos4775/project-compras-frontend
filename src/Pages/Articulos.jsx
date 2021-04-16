import React, { useState, useEffect } from "react";
import MainLayout from "../Layout/MainLayout";
import axios from "axios";

const Articulos = () => {
  const baseUrl = "https://localhost:44348/api/articulos";
  const unidadMedidaUrl = "https://localhost:44348/api/unidadesmedidas";
  const [articulo, setArticulo] = useState([]);
  const [unidadMedida, setUnidadMedida] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
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
    console.log(newSelection);
  };

  const peticionGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      setArticulo(response.data);
    } catch (error) {
      console.log(error);
    }
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
    console.log("Getting data");
    peticionGet();
    peticionGetUnidadMedida();
  }, [refreshCount]);

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto">
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
              </div>
              <p className="ml-12 text-lg leading-6 font-medium text-gray-900">
                Agregar articulo
              </p>
              <br />
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Id Articulo
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Descripción
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Marca
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Unidad de Medida
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Existencia
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Estado
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Operaciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {articulo.map((gestor) => (
                      <tr key={gestor.id_Articulo}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {gestor.id_Articulo}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.descripcion}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.marca}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.id_Unidad_Medida}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.existencia}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {gestor.estado ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <tr>
                            <td>
                              <img
                                src="mode_edit-24px.svg"
                                alt=""
                                onClick={() => {
                                  setIsOpen(!isOpen);
                                  setGestorSeleccionado(gestor);
                                  setIsEdit(true);
                                }}
                                className="cursor-pointer"
                              />
                            </td>
                            <td>
                              <img
                                src="delete_outline-24px.svg"
                                alt=""
                                onClick={() => {
                                  peticionDelete(gestor);
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
                className="my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Marca:
              </label>
              <input
                type="text"
                name="marca"
                onChange={handleChange}
                value={gestorSeleccionado.marca}
                className="my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
              <br />
              <label className="my-3 block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Unidad medida:
              </label>
              <select
                name="id_Unidad_Medida"
                className="mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
                type="number"
              >
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
                value={gestorSeleccionado.existencia}
                className="my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
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
