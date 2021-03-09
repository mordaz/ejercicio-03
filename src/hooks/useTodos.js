/*********************************************************************************************
Titulo:  useTodos.js
Tipo:    Custom Hook basico 
Nivel:   Nivel 1 - FORMULARIO BASICO CON LOCAL STORAGE
Creador: Emmanuel Ordaz Alvarez 
Daztec Todos los derechos reservados, prohibida su copia, distribucion o uso no autorizado
*********************************************************************************************/

//destructuramos useState de REACT para usar un HOOK basico
//destructuramos useEffect de REACT para usar efectos 
import { useEffect, useState } from "react"

//creamos una variable para recuperar los todos del localStorage
//se usa JSON.parse para convertir la cadanea de texto almacenada en localStorage en un objeto JSON
const localTodos = JSON.parse(localStorage.getItem('todos'));

//creamos el valor inicial del HOOK
const initialTodos = {
    id: Date.now(),
    titulo: 'Tarea 1',
    descripcion: "Descripcion de la tarea 1",
    completada: false
}

//creamos un custom hook que recibe el valor inicial y le damos valor por defecto
export const useTodos = ( ) => {
    
    //creamos un HOOK basico que contiene un arreglo de objetos
    //al iniciar cargamos los localTodos almacenados en localStorage si no los valores iniciales
    const [todos, setTodos] = useState(localTodos || [initialTodos]);
    //creamos un HOOK basico para editar el HOOK principal
    const [todoEdit, setTodoEdit] = useState(null)

    //creamos un efeecto para que cada que cambie el valor de todos se guarde 
    //en el almacenamiento local del navegador
    useEffect( () => {
        //para poder grabar informacion en localStorage se debe enviar como cadena de texto
        localStorage.setItem('todos', JSON.stringify(todos));
    },[todos]);
    


    //creamos una funcion para ELIMINAR elementos del HOOK
    //recibimos como parametro el id del objeto a eliminar
    const todoDelete = ( todoId ) => {

        //antes de eliminar validamos si se quiere eliminar un elemento que se esta editando
        //antes de comparar valdiamos si todoEdit no es nullo 
        if (todoEdit && todoId === todoEdit.id)
        {
            //inhabilitamos todoEdit para salga del modo edicion
            setTodoEdit(null);
        } 

        //creamos el nuevo arreglo de todos que enviaremos al HOOK
        //con filter guardamos todos los objetos donde el id sea diferente del 
        //id que estamos recibiendo como parametro
        const nuevosTodos = todos.filter( todo => todo.id !== todoId);
        //enviamos los nuevos valores al HOOK
        setTodos(nuevosTodos);
    }

    //creamos una funcion para CONFIRMAR elementos del HOOK
    //recibimos como parametro el id del objeto a modificar
    const todoConfirm = ( todoId ) => {
        //creamos el nuevo arreglo de todos que enviaremos al HOOK
        //con map recorremos todo el arreglo de objetos y comprobamos si el id
        //del objeto es igual al id recibido como parametro, si es asi regresa
        //una copia del objeto con su parametro completada actualizado
        const nuevosTodos = todos.map( todo => (
            todo.id === todoId 
            ? {...todo, completada: !todo.completada}
            : todo
       ));
        //enviamos los nuevos valores al HOOK
        setTodos(nuevosTodos);
    }

    //creamos una funcion para ACTUALIZAR elementos del HOOK
    //recibimos como parametro un objeto todo del objeto a modificar
    const todoUpdate = ( todoEdit ) => {
        //creamos el nuevo arreglo de todos que enviaremos al HOOK
        //con map recorremos todo el arreglo de objetos y comprobamos si el id
        //del objeto es igual al id del objeto recibido como parametro, si es asi regresa
        //el objeto todoEdit recibido como parametro y si no regresa el mismo objeto sin editar
        const nuevosTodos = todos.map( todo => (
            todo.id === todoEdit.id 
            ? todoEdit
            : todo
       ));
        //enviamos los nuevos valores al HOOK
        setTodos(nuevosTodos);
    }

    //creamos una funcion para CREAR un elemento nuevo en el HOOK
    //recibimos como para metro el objeto todo que se quiere agregar
    const todoAdd = ( todo ) => {
        //creamos el nuevo todo para agregarlo al arreglo de objetos del HOOK
        //creamos un id con el valor que regresa fecha para evitar que se repita
        const nuevoTodo = {
            id: Date.now(),
            titulo: todo.titulo,
            descripcion: todo.descripcion,
            completada: false
        }
        //creamos el nuevo arreglo de todos que enviaremos al HOOK
        //copiamos los objetos anteriores y agregamos el nuevo objeto
        const nuevosTodos = [
            nuevoTodo,
            ...todos            
        ];
        //enviamos los nuevos valores al HOOK
        setTodos(nuevosTodos);        
    }

    //regresamos las variables y funciones del customhook
    return {
        todos,
        todoDelete,
        todoConfirm,
        todoUpdate,
        todoAdd,
        todoEdit,
        setTodoEdit
    };
}