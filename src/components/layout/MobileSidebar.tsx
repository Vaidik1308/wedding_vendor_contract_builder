'use client'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HomeIcon, LogOut, MenuIcon } from "lucide-react"
import { AuthUser } from "@/lib/types"
import Link from "next/link"
import { useState } from "react"

export const MobileSidebar = ({ user, handleLogout }: { user: AuthUser, handleLogout: () => void }) => {
    const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
            <MenuIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Wedding AI</SheetTitle>
          <SheetDescription>
              Welcome, {user.name}
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <Link onClick={() => setOpen(false)} className="w-[100%]" href="/dashboard">
            <Button className="w-full flex justify-center" variant="outline">
              <HomeIcon className="size-4" />
              Dashboard
            </Button>
          </Link>
          <Link onClick={() => setOpen(false)} className="w-[100%]" href="/" onClick={handleLogout}>
            <Button className="w-full flex justify-center" variant="outline">
              <LogOut className="size-4" />
              Logout
            </Button>
          </Link>
        </div>
        <SheetFooter>
          {/* <Button type="submit">Save changes</Button> */}
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
