/*********************************************************************************************
Titulo:  TODO
Tipo:    Componente de Formulario 
Nivel:   Nivel 1 - FORMULARIO BASICO CON LOCAL STORAGE
Creador: Emmanuel Ordaz Alvarez 
Daztec Todos los derechos reservados, prohibida su copia, distribucion o uso no autorizado
*********************************************************************************************/

//libreria para trabajar con elementos JSX de REACT
import React from 'react'

//creamos el componente funcional FC
//recibimos el objeto "todo" de props y lo destructuramos directamente 
export const Todo = ( { todo, todoDelete, todoConfirm, setTodoEdit } ) => {

    //regresamos el codigo JSX
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">
                        {/* enviamos el titulo recibido en las props */}
                        { todo.titulo }
                    </h3>
                    <p className="card-text">
                        {/* enviamos la descripcion obtenida en las props*/}
                        { todo.descripcion }
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <button 
                            onClick={ () => { todoConfirm(todo.id); }}
                            className={`btn btn-sm ${todo.completada ? 'btn-success' : 'btn-outline-success'}`}
                        >
                            {/* si la tarea esta terminada vamos a hacer cambios */}
                            { todo.completada ? 'Terminado ;)' : 'Terminar'}
                        </button>
                        <button 
                            // enviamos el todo actual al todoEdit
                            onClick={ ()=>  { setTodoEdit(todo) }}
                            className="btn btn-sm btn-outline-primary"
                        >
                            Editar
                        </button>
                        {/* ejecutamos la funcion para eliminar el objeto del HOOK */}
                        <button 
                            onClick={ () => { todoDelete(todo.id); }}
                            className="btn btn-sm btn-outline-danger"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}