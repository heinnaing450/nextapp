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
import { useForm, SubmitHandler, Controller } from "react-hook-form"

import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';

const TodoList = [
   { id: 1, name: 'FE', start_time: '月曜日～金曜日(8:00)', end_time: '月曜日～金曜日(8:30)', status: { name: '中', code: '1001' }, remark: 'shoon' }
]

const initData = { id: 0, name: '', start_time: '', end_time: '', status: { name: '', code: '' }, remark: '' }

const Index = () => {
   const {
      control,
      register,
      handleSubmit,
      reset,
      getValues,

      formState: { errors, isDirty },
   } = useForm<todoType>(
      { defaultValues: initData }
   )

   const [count, setCount] = useState(0);

   const [todoList, setTodoList] = useState(TodoList);

   function onAdd(data: todoType) {
      data.id = todoList.length + 1
      console.log(data)
      const newTodo = { ...data }
      setTodoList([...todoList, newTodo])
      console.log(todoList)
   }
   function onDelete(id: number) {
      console.log('削除', id)
      const filterTodo = todoList.filter(d => d.id != id)
      setTodoList(filterTodo)
   }
   function onEdit(id: number) {
      const filterTodo = todoList.find(d => d.id == id)
      if (filterTodo != undefined) {
         console.log(filterTodo)
         reset(filterTodo)
      }
   }
   function onUpdate(data: todoType) {
      if (!isDirty) return;
      const updateTodoList = todoList.map(t => {
         if (t.id == data.id) {

            return { ...t, ...data };
         } else {
            return t;
         }
      });
      console.log(updateTodoList)
      setTodoList(updateTodoList)

   }

   const actionButton = (data: todoType) => {
      return <>
         <span className='pr-2'><Button label='編集' onClick={() => onEdit(data.id)} /></span>
         <span ><Button label='削除' onClick={() => onDelete(data.id)} />
         </span>

      </>
   }

   const onSubmitAdd: SubmitHandler<todoType> = (data) => {
      console.log(data)
      onAdd(data)
      reset(initData)
   }
   const onSubmitUpdate: SubmitHandler<todoType> = (data) => {
      console.log("update" + data)
      onUpdate(data)
      reset(initData)
   }
   const [selectedStatus, setSelectedStatus] = useState(null);
   const status = [
      { name: '中', code: '1001' },
      { name: '完了', code: '1002' },

   ];

   return (

      <div>
         <TodoView todoList={todoList} onEdit={onEdit} onDelete={onDelete} />
         <form >
            <div className="card flex justify-content-center">
               <div className="flex flex-column gap-2">

                  name<InputText className="p-inputtext-sm"   {...register("name", { required: true })} />
                  {errors.name && <span className='text-red-400'>Name is required</span>}
                  start_time<InputText className="p-inputtext-sm" {...register("start_time", { required: true })} />
                  {errors.start_time && <span className='text-red-400'>Start Time is required</span>}
                  end_time<InputText className="p-inputtext-sm"  {...register("end_time", { required: true })} />
                  {errors.end_time && <span className='text-red-400'>End Time is required</span>}
                  {/* status<InputText className="p-inputtext-sm" {...register("status", { required: true })} />
                  {errors.status && <span className='text-red-400'>Status Time is required</span>} */}
                  status

                  <Controller
                     name="status"
                     control={control}
                     rules={{ required: 'Status is required.' }}
                     render={({ field, fieldState }) => (
                        <Dropdown
                           id={field.name}
                           value={field.value}
                           optionLabel="name"
                           placeholder="Select a City"
                           options={status}
                           focusInputRef={field.ref}
                           onChange={(e) => field.onChange(e.value)}
                           className={classNames({ 'p-invalid': fieldState.error })}
                        />
                     )}
                  />

                  remark<InputText className="p-inputtext-sm"  {...register("remark", { required: true })} />
                  {errors.remark && <span className='text-red-400'>End Time is required</span>}

                  <Button label={getValues("id") > 0 ? '更新' : '追加'} onClick={getValues("id") > 0 ? handleSubmit(onSubmitUpdate) : handleSubmit(onSubmitAdd)} />

               </div>
            </div>
         </form>
      </div>
   )
}

export default Index