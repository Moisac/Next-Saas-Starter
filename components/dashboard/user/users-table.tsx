"use client"

import { useCallback, useMemo, useState } from "react"
import { Column, Row } from "@tanstack/react-table"
import { ArrowUpDown, Check, PanelRightClose, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table } from "@/components/common/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "@/types/user"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ManageUserAccount } from "./manage-user-account"
import { pricingData } from "@/config/subscriptions"

interface UsersTable {
  data: User[]
}


const ToggleSorting = ({ column, children }: { column: Column<User, unknown>, children: React.ReactNode }) => {
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


export function UsersTable({ data }: UsersTable) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const getUserSubscription = useCallback((stripePriceId: string | null) => {

   return pricingData.find((plan) => plan.stripeIds.monthly === stripePriceId) ||
    pricingData.find((plan) => plan.stripeIds.yearly === stripePriceId);
}, [])

  
  const columns = [
    {
      accessorKey: "name",
      header: ({ column } : { column: Column<User, unknown> }) => {
          return <ToggleSorting column={column}>Name</ToggleSorting>
      },
    },
    {
      accessorKey: "email",
      header: ({ column } : { column: Column<User, unknown> }) => {
          return <ToggleSorting column={column}>Email</ToggleSorting>
      },
    },
    {
      accessorKey: "emailVerified",
      header: ({ column } : { column: Column<User, unknown> }) => {
        return <ToggleSorting column={column}>Email verified</ToggleSorting>
      },
      cell: ({ row } : { row: Row<User> }) => (
        <p className="text-center">
          {row.original.emailVerified ? <Check className="m-auto text-green-600"/> :<X className="m-auto text-red-600"/>}
        </p>
      )
    },
    {
      accessorKey: "createdAt",
      header: ({ column } : { column: Column<User, unknown> }) => {
        return <ToggleSorting column={column}>Created at</ToggleSorting>
      },
      cell: ({ row } : { row: Row<User> }) => (
        <p className="text-center">
          {format(new Date(row.original.createdAt), 'yyyy-MM-dd HH:mm:ss')}
        </p>
      )
    },
    {
      accessorKey: "updatedAt",
      header: ({ column } : { column: Column<User, unknown> }) => {
        return <ToggleSorting column={column}>Updated at</ToggleSorting>
      },
      cell: ({ row } : { row: Row<User> }) => (
        <p className="text-center">
          {format(new Date(row.original.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
        </p>
      )
    },
    {
      accessorKey: "stripePriceId",
      header: ({ column } : { column: Column<User, unknown> }) => {
        return <ToggleSorting column={column}>Subscription</ToggleSorting>
      },
      cell: ({ row } : { row: Row<User> }) => (
        <p className="text-center">
          { getUserSubscription(row.original.stripePriceId)?.title }
        </p>
      )
    },
    {
      accessorKey: "isActive",
      header: ({ column } : { column: Column<User, unknown> }) => {
        return <ToggleSorting column={column}>Active account</ToggleSorting>
      },
      cell: ({ row } : { row: Row<User> }) => (
        <p className="text-center">
          {row.original.isActive ? <Check className="m-auto text-green-600"/> :<X className="m-auto text-red-600"/>}
        </p>
      )
    },
    {
      id: "actions",
      cell: ({ row }: { row: Row<User> }) => (
      <Button size="icon" variant="outline">
        <PanelRightClose onClick={() => setSelectedUser(row.original)}/>
      </Button>
      )
    },
  ]
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table data={data} columns={columns} searchColumn="email"/>
        </CardContent>
      </Card>

      <Dialog open={!!selectedUser?.id} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {selectedUser?.name}</DialogTitle>
            <DialogDescription>

            </DialogDescription>
            <ManageUserAccount selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
} 