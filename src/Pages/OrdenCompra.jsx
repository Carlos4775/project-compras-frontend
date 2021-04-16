import React, { useState, useEffect } from "react";
import MainLayout from "../Layout/MainLayout";
import axios from "axios";

const OrdenCompra = () => {
  const baseUrl = "https://localhost:44348/api/ordenescompras";
  const departamentosUrl = "https://localhost:44348/api/departamentos";
  const proveedoresUrl = "https://localhost:44348/api/proveedores";
  const [ordenCompra, setOrdenCompra] = useState([]);
  const [proveedor, setProveedor] = useState([]);
  const [departamento, setDepartamento] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    no_Orden: 0,
    fecha_Orden: "",
    estado: true,
    id_Articulo: 0,
    cantidad: 0,
    id_Unidad_Medida: 0,
    costo_Unitario: 0,
    id_Proveedor: 0,
    id_Departamento: 0,
    monto: 0,
    id_Asiento: 0,
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
      setOrdenCompra(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const peticionGetDepartamentos = async () => {
    try {
      const response = await axios.get(departamentosUrl);
      setDepartamento(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const peticionGetProveedores = async () => {
    try {
      const response = await axios.get(proveedoresUrl);
      setProveedor(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const peticionPost = async () => {
    try {
      const response = await axios.post(baseUrl, gestorSeleccionado);
      setOrdenCompra(ordenCompra.concat(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const peticionPut = async () => {
    try {
      const response = await axios.put(
        baseUrl + "/" + gestorSeleccionado.id_Orden_Compra,
        gestorSeleccionado
      );
      var respuesta = response.data;
      var dataAuxiliar = ordenCompra;
      dataAuxiliar.map((gestor) => {
        if (gestor.id_Orden_Compra === gestorSeleccionado.id_Orden_Compra) {
          gestor.no_Orden = respuesta.no_Orden;
          gestor.fecha_Orden = respuesta.fecha_Orden;
          gestor.estado = respuesta.estado;
          gestor.cantidad = respuesta.cantidad;
          gestor.costo_Unitario = respuesta.costo_Unitario;
          gestor.monto = respuesta.monto;
          gestor.id_Asiento = respuesta.id_Asiento;
          gestor.id_Articulo = respuesta.id_Articulo;
          gestor.id_Unidad_Medida = respuesta.id_Unidad_Medida;
          gestor.id_Proveedor = respuesta.id_Unidad_Medida;
          gestor.id_Departamento = respuesta.id_Departamento;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const peticionDelete = (x) =>
    axios
      .delete(baseUrl + "/" + x.id_Orden_Compra)
      .then((response) => {
        setOrdenCompra(
          ordenCompra.filter(
            (gestor) => gestor.id_Orden_Compra !== response.data
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });

  useEffect(() => {
    console.log("Getting data");
    peticionGet();
    peticionGetDepartamentos();
    peticionGetProveedores();
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
                Agregar orden de compra
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
                        Id orden
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Fecha
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
                        Cantidad
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Costo unit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Monto
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Id Asiento
                      </th>
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
                        Id U.M.
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Id Proveedor
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Id Departamento
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Operacion
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ordenCompra.map((gestor) => (
                      <tr key={gestor.id_Orden_Compra}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {gestor.id_Orden_Compra}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.no_Orden}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.fecha_Orden}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {gestor.estado ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.cantidad}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.costo_Unitario}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.monto}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.id_Asiento}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.id_Articulo}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.id_Unidad_Medida}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.id_Proveedor}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.id_Departamento}
                          </div>
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
              <h3 className="font-semibold text-lg">
                Insertar orden de compra
              </h3>
            </div>
            <div className="m-7 p-3">
              <div className="grid grid-cols-2">
                <div>
                  <div className="py-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      No. Orden
                    </label>
                    <input
                      type="number"
                      name="no_Orden"
                      onChange={handleChange}
                      value={gestorSeleccionado.no_Orden}
                      className="my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    ></input>
                  </div>
                  <div className="py-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Fecha Orden
                    </label>
                    <input
                      type="date"
                      name="fecha_Orden"
                      onChange={handleChange}
                      value={gestorSeleccionado.fecha_Orden}
                      className="my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    ></input>
                  </div>
                  <div className="py-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Cantidad
                    </label>
                    <input
                      type="number"
                      name="cantidad"
                      onChange={handleChange}
                      checked={gestorSeleccionado.cantidad}
                      className="my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    ></input>
                  </div>
                  <div className="py-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Costo unitario
                    </label>
                    <input
                      type="number"
                      name="costo_Unitario"
                      onChange={handleChange}
                      checked={gestorSeleccionado.costo_Unitario}
                      className="my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    ></input>
                  </div>
                  <div className="py-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Monto
                    </label>
                    <input
                      type="number"
                      name="monto"
                      onChange={handleChange}
                      checked={gestorSeleccionado.monto}
                      className="my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    ></input>
                  </div>
                  <div className="py-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Estado
                    </label>
                    <input
                      type="checkbox"
                      name="estado"
                      onChange={handleChange}
                      checked={gestorSeleccionado.estado}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded my-3"
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="py-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Id Asiento
                    </label>
                    <input
                      type="number"
                      name="id_Asiento"
                      onChange={handleChange}
                      value={gestorSeleccionado.id_Asiento}
                      className="my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    ></input>
                  </div>
                  <div className="py-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Id Articulo
                    </label>
                    <input
                      type="number"
                      name="id_Articulo"
                      onChange={handleChange}
                      value={gestorSeleccionado.id_Articulo}
                      className="my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    ></input>
                  </div>
                  <div className="py-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Id Unidad Medida
                    </label>
                    <input
                      type="number"
                      name="id_Unidad_Medida"
                      onChange={handleChange}
                      value={gestorSeleccionado.id_Unidad_Medida}
                      className="my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    ></input>
                  </div>
                  <div className="py-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Id Proveedor
                    </label>
                    <input
                      type="number"
                      name="id_Proveedor"
                      onChange={handleChange}
                      value={gestorSeleccionado.id_Proveedor}
                      className="my-3 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    ></input>
                  </div>
                  <div className="py-2">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Id Departamento
                    </label>
                    <select
                      name="id_Departamento"
                      className="mt-3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={handleChange}
                      type="number"
                    >
                      {departamento.map((departamento) => (
                        <option
                          key={departamento.id_Departamento}
                          value={departamento.id_Departamento}
                        >
                          {departamento.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
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
                    no_Orden: 0,
                    fecha_Orden: "",
                    estado: true,
                    id_Articulo: 0,
                    cantidad: 0,
                    id_Unidad_Medida: 0,
                    costo_Unitario: 0,
                    id_Proveedor: 0,
                    id_Departamento: 0,
                    monto: 0,
                    id_Asiento: 0,
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

export default OrdenCompra;
