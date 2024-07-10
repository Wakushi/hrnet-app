import React from "react"

import {
  Column,
  ColumnDef,
  PaginationState,
  Table,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Employee } from "../lib/types"
import { useSelector } from "react-redux"
import { getEmployeeList } from "../lib/selectors"
import { FaArrowDownShortWide, FaArrowUpWideShort } from "react-icons/fa6"

export default function EmployeeDataTablePage() {
  const employees = useSelector(getEmployeeList)

  if (!employees.length) {
    return (
      <div className="flex items-center justify-center p-20">
        <p className="text-lg">No employee registered.</p>
      </div>
    )
  }

  const data = React.useMemo(() => employees, [employees])

  const columns = React.useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        accessorFn: (row) => row.firstName,
        id: "firstName",
        cell: (info) => info.getValue(),
        header: () => <span>First Name</span>,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorFn: (row) => row.startDate,
        id: "startDate",
        cell: (info) => info.getValue(),
        header: () => <span>Start date</span>,
      },
      {
        accessorFn: (row) => row.department,
        id: "department",
        cell: (info) => info.getValue(),
        header: () => <span>Department</span>,
      },
      {
        accessorFn: (row) => row.birthdate,
        id: "birthdate",
        cell: (info) => info.getValue(),
        header: () => <span>Birthdate</span>,
      },
      {
        accessorFn: (row) => row.street,
        id: "street",
        cell: (info) => info.getValue(),
        header: () => <span>Street</span>,
      },
      {
        accessorFn: (row) => row.city,
        id: "city",
        cell: (info) => info.getValue(),
        header: () => <span>City</span>,
      },
      {
        accessorFn: (row) => row.state,
        id: "state",
        cell: (info) => info.getValue(),
        header: () => <span>State</span>,
      },
      {
        accessorFn: (row) => row.zipCode,
        id: "zipCode",
        cell: (info) => info.getValue(),
        header: () => <span>Zip code</span>,
      },
    ],
    []
  )

  return (
    <EmployeeDataTable
      {...{
        data,
        columns,
      }}
    />
  )
}

function EmployeeDataTable({
  data,
  columns,
}: {
  data: Employee[]
  columns: ColumnDef<Employee>[]
}) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 p-8 pt-20 h-full">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <FaArrowUpWideShort />,
                          desc: <FaArrowDownShortWide />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => {
            return (
              <tr
                key={row.id}
                className={`p-4 border-b hover:bg-brand hover:text-white ${
                  i % 2 === 0 ? "bg-slate-100" : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

function Filter({
  column,
  table,
}: {
  column: Column<any, any>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      className="w-full my-2 shadow-none rounded font-normal border-none"
      onChange={(e) => column.setFilterValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      type="text"
      placeholder="Filter.."
      value={(columnFilterValue ?? "") as string}
    />
  )
}
