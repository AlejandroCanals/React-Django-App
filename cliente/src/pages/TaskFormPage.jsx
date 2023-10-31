import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function TaskFormPage() {
  {
    /* Gestiona los datos del formulario */
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  {
    /* Gestiona navegacion entre diferentes rutas */
  }
  const navigate = useNavigate();

  {
    /* Con esta funcion obtenemos un arreglo del id si tiene para luego poder hacer una condicional con el boton delete */
  }
  const params = useParams();

  {
    /*  Sirve para crear una tarea y redigir a la pagina principal*/
  }
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("Tarea actualizada", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createTask(data);
      toast.success("Tarea creada", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTasks() {
      if (params.id) {
        const res = await getTask(params.id);
        setValue("title", res.data.title);
        setValue("description", res.data.description);
      }
    }
    loadTasks();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          {...register("title", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />

        {errors.title && <span>Thsi field is required</span>}

        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        ></textarea>
        {errors.description && <span>This field is required</span>}

        <button className="bg-indigo-500 p-3 round-lg block w-full mt-3">
          Save
        </button>
      </form>

      {/* Si existe un parametro id muestra el boton delete*/}
      {params.id && (
       <div className="flex justify-end">
         <button
          className="bg-red-500 p-3 round-lg block w-48 mt-3"
          onClick={async () => {
            const accepted = window.confirm("are you sure?");
            if (accepted) {
              await deleteTask(params.id);
              navigate("/tasks");
              toast.success("Tarea eliminada", {
                position: "bottom-right",
                style: {
                  background: "#101010",
                  color: "#fff",
                },
              });
            }
          }}
        >
          Delete
        </button>
        </div>
      )}
    </div>
  );
}
