import { Table, TableTbody } from '@mantine/core';
import { flexRender, Table as TanstackTable } from '@tanstack/react-table';

type TableProps<T> = {
  table: TanstackTable<T>;
};

const Table_ = <T,>({ table }: TableProps<T>) => {
  return (
    <Table withColumnBorders highlightOnHover withTableBorder striped>
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
