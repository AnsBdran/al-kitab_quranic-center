import { Table, TableTbody } from '@mantine/core';
import {
  Column,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type TableProps = {
  data: TableData;
  columns: Column<AttendaceRecord | StudentRecord>[];
};

const Table_ = ({ data, columns }: TableProps) => {
  const table = useReactTable({
    data,
    getCoreRowModel: getCoreRowModel(),
    columns,
  });
  // console.log('table', { data, columns });

  return (
    <Table
      withColumnBorders
      // highlightOnHoverColor='cyan.0'
      highlightOnHover
      withTableBorder
      striped
    >
      <Table.Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.Th key={header.id}>
                {header.column.columnDef.header as string}
              </Table.Th>
            ))}
          </Table.Tr>
        ))}
      </Table.Thead>
      <TableTbody>
        {table.getRowModel().rows.map((row) => (
          <Table.Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </TableTbody>
    </Table>
  );
};

export default Table_;
