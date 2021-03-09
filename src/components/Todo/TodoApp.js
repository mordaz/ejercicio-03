/*********************************************************************************************
Titulo:  TodoApp.js
Tipo:    Componente de Formulario 
Nivel:   Nivel 1 - FORMULARIO BASICO CON LOCAL STORAGE
Creador: Emmanuel Ordaz Alvarez 
Daztec Todos los derechos reservados, prohibida su copia, distribucion o uso no autorizado
*********************************************************************************************/

//libreria para trabajar con elementos JSX de REACT
import React from 'react'
//importamos el custom hook para manipular los todos
import { useTodos } from '../../hooks/useTodos'
//importamos el form para interactuar con los elementos
import { TodoForm } from './TodoForm'
//importamos la lista de elementos
import { TodoList } from './TodoList'

//creamos el componente funcional FC
export const TodoApp = () => {

    //importamos el customhook y destructuramos sus variables y funciones
    const { todos, todoDelete, todoConfirm, todoUpdate, todoAdd, todoEdit, setTodoEdit } = useTodos();

    //regresamos el codigo JSX
    return (
        //contenedor grid bootstrap
        <div className="container mt-1">
            <div className="row"> 
                <div className="col-8">
                    {/* enviamos el HOOK y las funciones necesarias al componente */}
                    <TodoList 
                        todos={ todos }
                        todoDelete= { todoDelete }
                        todoConfirm={ todoConfirm }
                        setTodoEdit={ setTodoEdit }
                    />
                </div>
                <div className="col-4">
                    {/* enviamos el HOOK y las funciones necesarias al componente */}
                    <TodoForm 
                        todoEdit={ todoEdit }
                        todoAdd={ todoAdd }
                        todoUpdate= { todoUpdate }
                        setTodoEdit={ setTodoEdit }
                    />
                </div>
            </div>
        </div>
    )
}