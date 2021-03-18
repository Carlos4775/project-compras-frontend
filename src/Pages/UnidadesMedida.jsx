import axios from "axios";
import React, { useState, useEffect } from "react";
import MainLayout from "../Layout/MainLayout";

const UnidadesMedida = () => {
  const baseUrl = "https://localhost:44348/api/unidadesmedidas";
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    id_Unidad_Medida: 0,
    descripcion: "",
    estado: false,
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
    console.log(gestorSeleccionado);
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
        baseUrl + "/" + gestorSeleccionado.id_Unidad_Medida,
        gestorSeleccionado
      );
      var respuesta = response.data;
      var dataAuxiliar = data;
      dataAuxiliar.map((gestor) => {
        if (gestor.id_Unidad_Medida === gestorSeleccionado.id_Unidad_Medida) {
          gestor.descripcion = respuesta.descripcion;
          gestor.estado = respuesta.estado;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const peticionDelete = (x) =>
    axios
      .delete(baseUrl + "/" + x.id_Unidad_Medida)
      .then((response) => {
        setData(
          data.filter((gestor) => gestor.id_Unidad_Medida !== response.data)
        );
      })
      .catch((error) => {
        console.log(error);
      });

  useEffect(() => {
    console.log("Getting data");
    peticionGet();
  }, [refreshCount]);

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="absolute flex items-center justify-center rounded-md text-white">
                <img
                  src="add_circle_outline-24px.svg"
                  alt=""
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  className="cursor-pointer"
                />
              </div>
              <p class="ml-12 text-lg leading-6 font-medium text-gray-900">
                Agregar unidad de medida
              </p>
              <br />
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Id Unidad de medida
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
                      <tr key={gestor.id_Unidad_Medida}>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="ml-4">
                              <div class="text-sm font-medium text-gray-900">
                                {gestor.id_Unidad_Medida}
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
                          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {gestor.estado}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
          <div class="bg-white rounded shadow-lg w-10/12 md:w-1/3">
            <div class="border-b px-4 py-2 flex justify-between items-center">
              <h3 class="font-semibold text-lg">Insertar unidad de medida</h3>
            </div>
            <div class="m-7 p-3">
              <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Id Unidad de medida
              </label>
              <input
                type="number"
                name="id_Unidad_Medida"
                onChange={handleChange}
                value={gestorSeleccionado.id_Unidad_Medida}
                class="my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              ></input>
              <br />
              <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Descripcion
              </label>
              <input
                type="text"
                name="descripcion"
                onChange={handleChange}
                value={gestorSeleccionado.descripcion}
                class="my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              ></input>
              <br />
              <label class="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Estado
              </label>
              <input
                type="checkbox"
                name="estado"
                onChange={handleChange}
                checked={gestorSeleccionado.estado}
              ></input>
            </div>
            <div class="flex justify-end items-center w-100 border-t p-3">
              <button
                class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                Cancel
              </button>
              <button
                class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                onClick={async () => {
                  isEdit ? await peticionPut() : await peticionPost();
                  setGestorSeleccionado({
                    id_Unidad_Medida: 0,
                    descripcion: "",
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

export default UnidadesMedida;
