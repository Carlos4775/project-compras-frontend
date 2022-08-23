import React, { useState } from "react";
import MainLayout from "../Layout/MainLayout";
import axios from "axios";
const Asientos = () => {
  const baseUrl = "https://d57b22c5989c.ngrok.io/api/accountingEntry";
  const asientosURL = "https://compras-apec.herokuapp.com/ordenescompras";
  const [ordenesCompras, setOrdenesCompras] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [gestorSeleccionado, setGestorSeleccionado] = useState({
    description: "Asiento de Compras correspondiente al periodo 2016-10",
    idAuxiliarSystem: 7,
    account: 0,
    movementType: "",
    seatAmount: 0,
    id: 0,
  });
  const [ordenSeleccionado, setOrdenSeleccionado] = useState({
    id_Orden_Compra: 0,
    no_Orden: 0,
    fecha_Orden: "",
    estado: true,
    id_Articulo: 0,
    cantidad: 0,
    id_Unidad_Medida: 0,
    Costo_Unitario: 0,
    id_Proveedor: 0,
    id_Departamento: 0,
    id_asiento: null,
  });

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    if (type === "number") {
      value = Number(value);
    } else if (type === "checkbox") {
      value = e.target.checked;
    }
    setOrdenSeleccionado({
      ...ordenSeleccionado,
      [name]: value,
    });
  };

  const handleChangeForm = (e) => {
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

  const peticionGetOrden = async () => {
    try {
      const response = await axios.get(
        asientosURL +
          "/" +
          ordenSeleccionado.fecha_inicio +
          "/" +
          ordenSeleccionado.fecha_fin
      );
      setOrdenesCompras(response.data.ordenes_compras);
      setGestorSeleccionado({
        ...gestorSeleccionado,
        seatAmount: response.data.monto_total,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const peticionPut = async () => {
    try {
      const response = await axios.put(
        asientosURL +
          "/" +
          gestorSeleccionado.id +
          "/" +
          ordenSeleccionado.fecha_inicio +
          "/" +
          ordenSeleccionado.fecha_fin,
        gestorSeleccionado
      );
    } catch (error) {
      console.log(error);
    }
  };

  const peticionPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseUrl, gestorSeleccionado);
      setGestorSeleccionado({
        ...gestorSeleccionado,
        id: response.data.id,
        entryDate: response.data.entryDate,
        status: response.data.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="md:container md:mx-auto px-4">
        <div className="flex flex-col sm:mt-0">
          <div className="mt-5 md:mt-0 grid md:grid-cols-2">
            <div className="pr-5">
              <div className="mb-5 pb-5 pr-5 inline-block">
                <label
                  htmlFor="fecha_inicio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  name="fecha_inicio"
                  id="fecha_inicio"
                  onChange={handleChange}
                  autoComplete="given-name"
                  className="mt-3 px-4 py-1 focus:ring-blue-500 focus:border-blue-500 block shadow-sm border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-5 pb-5 pl-5 inline-block">
                <label
                  htmlFor="fecha_fin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha Fin
                </label>
                <input
                  type="date"
                  name="fecha_fin"
                  id="fecha_fin"
                  onChange={handleChange}
                  autoComplete="given-name"
                  className="mt-3 px-4 py-1 focus:ring-blue-500 focus:border-blue-500 block shadow-sm border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-5 pb-5 pl-5 inline-block">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 mx-5 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={peticionGetOrden}
                >
                  Filtrar
                </button>
              </div>
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        No. orden
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
                        Id asiento
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Monto
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ordenesCompras.map((gestor) => (
                      <tr key={gestor.numero_orden}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {gestor.numero_orden}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.fecha}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.id_asiento}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {gestor.monto_orden}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <div className="my-5 pb-5 pr-5 inline-block">
                  <label
                    htmlFor="descripcion"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total
                  </label>
                  <input
                    type="text"
                    name="seatAmount"
                    id="seatAmount"
                    readOnly
                    onChange={handleChange}
                    className="mt-3 px-4 py-1 focus:ring-blue-500 focus:border-blue-500 block shadow-sm border border-gray-300 rounded-md"
                    value={gestorSeleccionado.seatAmount}
                  />
                </div>
                <div className="my-5 pb-5 pl-5 inline-block">
                  <label
                    htmlFor="id_asiento"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Id Asiento
                  </label>
                  <input
                    type="text"
                    name="id_asiento"
                    id="id_asiento"
                    readOnly
                    value={gestorSeleccionado.id}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="mt-3 px-4 py-1 focus:ring-blue-500 focus:border-blue-500 block shadow-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <div className="inline mr-5">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    Completar datos
                  </button>
                </div>
                <div className="inline ml-5">
                  <button
                    onClick={peticionPut}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
            <div
              className={
                "modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 " +
                (isOpen ? "hidden" : "")
              }
            >
              <div className="relative pl-5">
                <form action="#" method="POST">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 bg-white sm:p-6">
                      <div className="p-5 text-center">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Asientos Contables
                        </h3>
                        <p className="pt-3 bg-white mt-1 text-gray-600">
                          Digite los datos del asiento contable
                        </p>
                      </div>
                      <div className="bg-white sm:px-6 ">
                        <div className="p-3">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Descripción
                          </label>
                          <input
                            type="text"
                            disabled
                            readOnly
                            value={gestorSeleccionado.description}
                            name="description"
                            id="description"
                            autoComplete="given-name"
                            className="mt-3 px-4 py-1 focus:ring-blue-500 focus:border-blue-500 block shadow-sm border border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="p-3">
                          <label
                            htmlFor="idAuxiliarSystem"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Id Auxiliar
                          </label>
                          <input
                            readOnly
                            disabled
                            value={gestorSeleccionado.idAuxiliarSystem}
                            type="number"
                            name="idAuxiliarSystem"
                            id="idAuxiliarSystem"
                            onChange={handleChangeForm}
                            autoComplete="family-name"
                            className="mt-3 px-4 py-1 focus:ring-blue-500 focus:border-blue-500 block shadow-sm border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="p-3">
                          <label
                            htmlFor="account"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Id Cuenta
                          </label>
                          <input
                            type="number"
                            name="account"
                            min={0}
                            id="account"
                            onChange={handleChangeForm}
                            autoComplete="family-name"
                            className="mt-3 px-4 py-1 focus:ring-blue-500 focus:border-blue-500 block shadow-sm border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="p-3">
                          <label
                            htmlFor="movementType"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tipo Movimiento
                          </label>
                          <select
                            id="movementType"
                            name="movementType"
                            onChange={handleChangeForm}
                            autoComplete="familiar-name"
                            className="mt-3 w-24 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option>N/A</option>
                            <option value="DB">DB</option>
                            <option value="CR">CR</option>
                          </select>
                        </div>

                        <div className="p-3">
                          <label
                            htmlFor="seatAmount"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Monto
                          </label>
                          <input
                            type="text"
                            readOnly
                            disabled
                            name="seatAmount"
                            id="seatAmount"
                            value={gestorSeleccionado.seatAmount}
                            onChange={handleChangeForm}
                            className="mt-3 px-4 py-1 focus:ring-blue-500 focus:border-blue-500 block shadow-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="button"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => {
                          setIsOpen(!isOpen);
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={peticionPost}
                        className="inline-flex justify-center py-2 px-4 mx-5 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Asientos;
