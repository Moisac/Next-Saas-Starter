"use client"

import { Column, Row } from "@tanstack/react-table"
import { ArrowUpDown, CloudDownload, Copy, EllipsisVertical, ExternalLink } from "lucide-react"
import { Invoice } from "@/types/subscription"
import { Button } from "@/components/ui/button"
import { Table } from "@/components/common/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface UserInvoiceTable {
  data: Invoice[]
}

const ToggleSorting = ({ column, children }: { column: Column<Invoice, unknown>, children: React.ReactNode }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      { children }
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}


const columns = [
  {
    accessorKey: "customer_email",
    header: ({ column } : { column: Column<Invoice, unknown> }) => {
        return <ToggleSorting column={column}>Email</ToggleSorting>
    },
  },
  {
    accessorKey: "customer_name",
    header: ({ column } : { column: Column<Invoice, unknown> }) => {
      return <ToggleSorting column={column}>Name</ToggleSorting>
    },
  },
  {
    accessorKey: "amount_due",
    header: ({ column } : { column: Column<Invoice, unknown> }) => {
        return <ToggleSorting column={column}>Amount due</ToggleSorting>
    },
  },
  {
    accessorKey: "amount_paid",
    header: ({ column } : { column: Column<Invoice, unknown> }) => {
        return <ToggleSorting column={column}>Amount paid</ToggleSorting>
    },
  },
  {
    accessorKey: "collection_method",
    header: ({ column } : { column: Column<Invoice, unknown> }) => {
        return <ToggleSorting column={column}>Method</ToggleSorting>
    },
  },
  {
    accessorKey: "status",
    header: ({ column } : { column: Column<Invoice, unknown> }) => {
        return <ToggleSorting column={column}>Status</ToggleSorting>
    },
  },
  {
    accessorKey: "created",
    header: ({ column } : { column: Column<Invoice, unknown> }) => {
        return <ToggleSorting column={column}>Created</ToggleSorting>
    },
  },
  {
    accessorKey: "paid_at",
    header: ({ column } : { column: Column<Invoice, unknown> }) => {
        return <ToggleSorting column={column}>Paid at</ToggleSorting>
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<Invoice> }) => (
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(row.original.id)}
          className="cursor-pointer"
        >
          <Copy className="h-4 w-4 pr-1" /> Copy invoice ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ExternalLink className="h-4 w-4 pr-1" /> 
          <Link href={row.original.invoice_url} target="_blank">
            View invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CloudDownload className="h-4 w-4 pr-1" /> 
          <Link href={row.original.invoice_pdf} target="_blank">
            Download invoice
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    )
  },
]


export function UserInvoicesTable({ data }: UserInvoiceTable) {
  return (
    <Card className="max-w-[1300px]">
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <Table data={data} columns={columns} />
      </CardContent>
    </Card>
  )
} 