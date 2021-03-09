/*********************************************************************************************
Titulo:  TodoForm.js
Tipo:    Componente de Formulario 
Nivel:   Nivel 1 - FORMULARIO BASICO CON LOCAL STORAGE
Creador: Emmanuel Ordaz Alvarez 
Daztec Todos los derechos reservados, prohibida su copia, distribucion o uso no autorizado
*********************************************************************************************/

//libreria para trabajar con elementos JSX de REACT
import React, { useEffect, useState } from 'react'

//creamos el objeto que contendra los valores iniciales de los inputs
const initialInputValues = {
    titulo: '',
    descripcion: '' 
}

//creamos el componente funcional FC
export const TodoForm = ( { todoAdd, todoEdit, todoUpdate, setTodoEdit } ) => {

    //creamos un HOOK basico para controlar los valores de los inputs
    const [inputValues, setInputValues] = useState(initialInputValues)
    //destructuramos el objeto del HOOK para poder usarlos como variables
    const { titulo, descripcion } = inputValues;

    //creamos un HOOK basico para controlar los mensajes de error
    const [error, setError] = useState(null);
    //creamos un HOOK basico para controlar los mensajes de confirmacion
    const [confirmacion, setConfirmacion] = useState(null)

    //creamos un Effecto para cargar el estado cuando el todoEdit este habilitado
    //asociamos el HOOK todoEdit para supervisar cuando este cambie 
    useEffect( ()=> {
        //validamos si el Hook todoEdit no esta vacio
        if (todoEdit){
            //cargamos los valores del Hook en los inputs correspondientes 
            setInputValues(todoEdit);
        }
        else{
            setInputValues(initialInputValues)
        }
    },[todoEdit]);

    //creamos una funcion para actualizar los valores del HOOK con los de los inputs
    const handleInputChange = (e) => {
        //obtenemos los nuevos valores del HOOK sincronzandolos con el value de los inputs
        //hacemos una copia de los los valores del HOOK usando spread ...
        //despues cambiamos solo el valor que coincida con el nombre del input
        const nuevosInputValues = {
            ...inputValues,
            [e.target.name]: e.target.value
        }
        //actualizamos el valor del HOOK
        setInputValues(nuevosInputValues);
    }

    //creamos una funcion para agregar tareas al hacer submit en el formulario
    const handleSubmit = (e) => {
        //evitamos que la pagina recargue al hacer submit en el formulario
        e.preventDefault();
        //hacemos validacion de datos vacios
        if (titulo.trim() === ''){
            //enviamos el mensaje de error 
            setError('Debe indicar un titulo');
            return;
        }
        if (descripcion.trim() === ''){
            //enviamos el mensaje de error 
            setError('Debe indicar una descripcion');
            return;
        }

        //validamos si nos encontramos en modo de edicion o en modo de adicion
        if (todoEdit){
            //actualizamos el HOOK con los valores de los inputs
            todoUpdate( inputValues );
            //si todo se ingreso correctamwente eviamos el mensaje de confirmacion
            setConfirmacion('Actualizado con exito');
            //despues de actualizar regresamos al modo de adicion
            setTodoEdit(null);
        }
        else {
            //agregamos el nuevo objeto al HOOK de todos usando el HOOK de inputs
            todoAdd( inputValues );
            //si todo se ingreso correctamwente eviamos el mensaje de confirmacion
            setConfirmacion('Agregado con exito');
        }

        //si todo se ingreso correctamente limpiamos formularios
        setInputValues(initialInputValues);
        //si todo se ingreso correctamente limpiamos mensajes de error
        setError(null);
        //temoporizamos para que el mensaje de confirmacion desparezca automaticamente
        setTimeout( () => { setConfirmacion(null); },2000)
    }

    //regresamos el codigo JSX
    return (
        <div>
            {/* validamos si nos encuentramos en modo de edicion para colocar el titulo*/}
            <h2>{ todoEdit ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
            <form onSubmit={ handleSubmit }>
                <input 
                    type="text"
                    placeholder="Titulo"
                    className="form-control"
                    //asignamos el valor del HOOK al value del input
                    value={ titulo }
                    //asignamos un nombre igual al atributo del HOOK
                    name="titulo"
                    //agregamos el evento onChange para actualizar el HOOK
                    onChange={ handleInputChange }
                >
                </input>
                <textarea
                    placeholder="Descripcion"
                    className="form.control col-12 mt-2"
                    //asignamos el valor del HOOK al value del input
                    value={ descripcion }
                    //asignamos un nombre igual al atributo del HOOK
                    name="descripcion"
                    //agregamos el evento onChange para actualizar el HOOK
                    onChange={ handleInputChange }                    
                >
                </textarea>
                {/* validamos si se encuentra en modo edicion mostrar boton cancelar edicion */}
                {
                    todoEdit && (
                        <button
                            // al enviarle null al todoEdit cancelamos el modo de edicion
                            onClick={ () => { setTodoEdit(null); }}
                            className="btn btn-warning"
                        >
                            Cancelar Edicion
                        </button>
                    )
                }
                <button
                    className="btn btn-primary"
                >
                {/* validamos si nos encuentramos en modo de edicion para colocar el titulo*/}
                    { todoEdit ? 'Actualizar Tarea' : 'Agregar Tarea'}
                </button>
            </form>
            {
                // validamos si el mensaje de error debe mostrarse
                error && (
                    // etiqueta para enviar mensajes de error al usuario
                    <div className="alert alert-danger">
                        { error }
                    </div>
                ) 
            }
            {
                // validamos si el mensaje de confirmacion debe mostrarse
                confirmacion && (
                    // etiqueta para enviar mensajes de error al usuario
                    <div className="alert alert-success">
                        { confirmacion }
                    </div>
                ) 
            }
        </div>
    )
}