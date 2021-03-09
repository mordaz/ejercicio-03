/*********************************************************************************************
Titulo:  TodoList.js
Tipo:    Componente de Formulario 
Nivel:   Nivel 1 - FORMULARIO BASICO CON LOCAL STORAGE
Creador: Emmanuel Ordaz Alvarez 
Daztec Todos los derechos reservados, prohibida su copia, distribucion o uso no autorizado
*********************************************************************************************/

//libreria para trabajar con elementos JSX de REACT
import React from 'react'
//importamos el componente a enlistar
import { Todo } from './Todo'

//creamos el componente funcional FC
export const TodoList = ( { todos, todoDelete, todoConfirm, setTodoEdit } ) => {

    //regresamos el codigo JSX
    return (
        <div>
            <h2>Todo List</h2>
            {/* Verificamos si hay tareas para listas */}
            {
                todos.length === 0 ? (
                    <div className="alert alert-primary"> 
                        No hay tareas pendientes
                    </div>                    
                ) : (
                    // recorremos el HOOK y enviamos todos los objetos del arreglo como props
                    // REACT exige que enviemos una key por cada elemento enviado
                    todos.map( todo => (
                        <Todo 
                            key={ todo.id } 
                            todo={ todo }
                            todoDelete={ todoDelete }
                            todoConfirm={ todoConfirm }
                            setTodoEdit={ setTodoEdit }
                        />
                    ))                    
                )

            }
        </div>
    )
}