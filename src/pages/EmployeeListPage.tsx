import React from "react"
import { useSelector } from "react-redux"
import { useTable, Column } from "react-table"
import { getEmployeeList } from "../lib/selectors"
import { Employee } from "../lib/types"

export default function EmployeeListPage() {
  const employees = useSelector(getEmployeeList)

  if (!employees.length) {
    return (
      <div className="flex items-center justify-center p-20">
        <p className="text-lg">No employee registered.</p>
      </div>
    )
  }

  const data = React.useMemo(() => employees, [employees])

  const columns: Column<Employee>[] = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Start Date",
        accessor: "startDate",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Birthdate",
        accessor: "birthdate",
      },
      {
        Header: "Street",
        accessor: "street",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "State",
        accessor: "state",
      },
      {
        Header: "Zip Code",
        accessor: "zipCode",
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 p-8 pt-20 h-full">
      <table
        {...getTableProps()}
        className="min-w-full border-collapse block md:table"
      >
        <thead className="block md:table-header-group">
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.id}
              className="border-b block md:table-row"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className="block md:table-cell p-2 text-left"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="block md:table-row-group">
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                className="border-b block md:table-row"
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className="block md:table-cell p-2"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
