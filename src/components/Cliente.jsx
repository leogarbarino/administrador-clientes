import { useNavigate, Form, redirect } from "react-router-dom";
import { eliminarCliente } from "../data/clientes";

export async function action({ params }) {
  await eliminarCliente(params.clienteId);

  return redirect("/");
}

function Cliente({ cliente }) {
  const navigate = useNavigate();
  const { nombre, empresa, email, telefono, id } = cliente;

  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-900">{nombre}</p>
        <p className="text-gray-700 font-sans font-medium">{empresa}</p>
      </td>

      <td className="p-6">
        <p className="text-gray-600">
          {" "}
          <span className="text-gray-600 font-bold font-serif ">email: </span>
          {email}
        </p>
        <p className="text-gray-600">
          {" "}
          <span className="text-gray-600 font-bold font-serif">tel: </span>
          {telefono}
        </p>
      </td>

      <td className="p-6 flex gap-5">
        <button
          onClick={() => navigate(`/clientes/${id}/editar`)}
          type="button"
          className="text-blue-600 hover:text-blue-900 uppercase font-bold text-xs mt-4"
        >
          Editar
        </button>

        <Form
          method="post"
          action={`/clientes/${id}/eliminar`}
          onSubmit={(e) => {
            if (!confirm("Estás seguro que quieres eliminar este registro?")) {
              e.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="text-red-600 hover:text-red-900 uppercase font-bold text-xs mt-5"
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
}

export default Cliente;
