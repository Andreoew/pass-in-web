import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
  ChevronRight,
} from "lucide-react";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table.cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useState } from "react";
import { Input } from "./Input";
import { attendees } from "../data/attendees";

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const totalPage = Math.ceil(attendees.length / 10)
  const totalAttendeesPerPage = page * 10 > attendees.length ? attendees.length - ((page - 1) * 10) : 10;

  function onSearchInputChange(event: ChangeEvent<HTMLInputElement>){
    setSearch(event.target.value)
  }

  function goToFirstPage(){
    setPage(1)
  }

  function goToNextPage(){
    setPage(page + 1)
  }

  function goToPreviousPage(){
    setPage(page - 1)
  }

  function goToLastPage(){
    setPage(totalPage)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-1.5 border w-72 border-white/10  rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <Input
            onChange={onSearchInputChange}            
            type="text"
            placeholder="Buscar participantes..."
          />
        </div>
        {search}
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.slice((page -1) * 10, page * 10).map((attendee) => {
            return (
              <TableRow
                key={attendee.id}
              >
                <TableCell>
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border-white/10"
                  />
                </TableCell>
                <TableCell>001616</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {attendee.name}
                    </span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {dayjs().to(attendee.createdAt)}
                </TableCell>
                <TableCell>
                {dayjs().to(attendee.checkedInAt)}
                </TableCell>
                <TableCell>
                  <IconButton transparent={true}>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell
              className="py-3 px-4 text-sm font-semibold text-left"
              colSpan={3}
            >
              Mostrando {totalAttendeesPerPage} de {attendees.length} itens
            </TableCell>
            <TableCell
              className="py-3 px-4 text-sm font-semibold text-right"
              colSpan={3}
            >
              <div className="inline-flex items-center gap-8">
                <span>Página {page} de {totalPage}</span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}> 
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === totalPage}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={page === totalPage}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
