import styles from '../../styles/site.module.scss'
import React from 'react';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { table } from 'console';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TodoView from '@/components/todoView';
import { todoType } from '@/types/todoType';

const TodoList = [
   { id: 1, name: 'FE', start_time: '月曜日～金曜日(8:00)', end_time: '月曜日～金曜日(8:30)', status: '中', remark: 'shoon' }
]

const initData = { id: 0, name: '', start_time: '', end_time: '', status: '', remark: '' }

const Index = () => {

   // Declare a new state variable, which we'll call "count"
   const [count, setCount] = useState(0);
   const [todo, setTodo] = useState(initData);
   const [todoList, setTodoList] = useState(TodoList);


   function onAdd() {
      todo.id = todoList.length + 1
      console.log(todo)
      // todoList.push(todo)
      const newTodo = { ...todo }
      setTodoList([...todoList, newTodo])
      setTodo(initData)
      console.log(todoList)
   }
   function onDelete(id: number) {
      console.log('削除', id)
      const filterTodo = todoList.filter(d => d.id != id)
      setTodoList(filterTodo)
      setTodo(initData)
   }
   function onEdit(id: number) {
      const filterTodo = todoList.find(d => d.id == id)
      if (filterTodo != undefined) {
         console.log(filterTodo)
         setTodo(filterTodo)
      }
   }
   function onUpdate() {

      const updateTodoList = todoList.map(t => {
         if (t.id === todo.id) {
            return { ...t, ...todo };
         } else {
            return t;
         }
      });
      console.log(updateTodoList)
      setTodoList(updateTodoList)
      setTodo(initData)
   }


   const actionButton = (todo: todoType) => {
      return <>
         <span className='pr-2'><Button label='編集' onClick={() => onEdit(todo.id)} /></span>
         <span ><Button label='削除' onClick={() => onDelete(todo.id)} />
         </span>

      </>
   }
   return (
      <div>
         <TodoView todoList={todoList} onEdit={onEdit} onDelete={onDelete} />
         {/* <div className="card">
            <DataTable value={todoList} tableStyle={{ minWidth: '50rem' }}>
               <Column field="name" header="name"></Column>
               <Column field="start_time" header="start_time"></Column>
               <Column field="end_time" header="end_time"></Column>
               <Column field="status" header="status"></Column>
               <Column field="remark" header="remark"></Column>
               <Column header="Action" body={actionButton}></Column>
            </DataTable>
         </div> */}

         <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
               name<InputText value={todo.name} className="p-inputtext-sm" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo({ ...todo, name: e.target.value })} />
               start_time<InputText value={todo.start_time} className="p-inputtext-sm" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo({ ...todo, start_time: e.target.value })} />
               end_time<InputText value={todo.end_time} className="p-inputtext-sm" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo({ ...todo, end_time: e.target.value })} />
               status<InputText value={todo.status} className="p-inputtext-sm" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo({ ...todo, status: e.target.value })} />
               remark<InputText value={todo.remark} className="p-inputtext-sm" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo({ ...todo, remark: e.target.value })} /><br />

               <Button label={todo.id > 0 ? '更新' : '追加'} onClick={todo.id > 0 ? onUpdate : onAdd} />

            </div>
         </div>


         
      </div>

   )

}


export default Index