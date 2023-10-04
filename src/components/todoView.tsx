import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { todoListType, todoType } from '@/types/todoType';



type Props = {
    todoList : todoListType
    onEdit :(id: number)=> void
    onDelete :(id: number)=> void

}

const TodoView = ({todoList,onEdit,onDelete}:Props) => {

    const actionButton = (todo: todoType) => {
        return <>
            <span className='pr-2'><Button label='編集' onClick={() => onEdit(todo.id)} /></span>
            <span ><Button label='削除' onClick={() => onDelete(todo.id)} />
            </span>

        </>
    }

    return <div className="card">
        <DataTable value={todoList} tableStyle={{ minWidth: '50rem' }}>
            <Column field="name" header="name"></Column>
            <Column field="start_time" header="start_time"></Column>
            <Column field="end_time" header="end_time"></Column>
            <Column field="status.name" header="status"></Column>
            <Column field="remark" header="remark"></Column>
            <Column header="Action" body={actionButton}></Column>
        </DataTable>
    </div>
}
export default TodoView