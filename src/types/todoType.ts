export type todoType = {
    id: number, name: string, start_time: string, end_time: string, status:{name:string,code:string}, remark: string
 }
 export type todoListType = {
    id: number, name: string, start_time: string, end_time: string, status: {name:string,code:string}, remark: string
 }[]