import { SignInButton, SignedIn, SignedOut, UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import style from "./navbar.module.css"
import { Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import { LogIn } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { ModeToggle } from '../change-theme';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <MenuDesktop />
          <ProfileMenu />
        </div>
      </div>

      <MenuMobile />
    </Disclosure>
  )
}

function MenuDesktop(){
  return(
    <>
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        {/* Mobile menu button*/}
        <DisclosureButton
          className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
          <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
        </DisclosureButton>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex flex-shrink-0 items-center">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            className="h-8 w-auto"
          />
        </div>
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium',
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function ProfileMenu(){
  const ProfileMenuData = [
    {href: "#", label: "Profile"},
    {href: "#", label: "Settings"},
    {href: "#", label: "Sign out"},
  ]
  function ProfileMenuItem(
    {href, label}:{href: string, label: string}
  ){
    return(
      <DropdownMenuItem>
        <Link href={href}
              className="block px-4 py-2 text-sm dark:text-slate-500 text-gray-700 data-[focus]:bg-gray-100">
          {label}
        </Link>
      </DropdownMenuItem>
    )
  }

  return (
    <div className="absolute inset-y-0 right-0 flex gap-5 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <ModeToggle />
      <ClerkLoading >
        <div className={"flex justify-center items-center"}>
          <div className={style.spinner}>
            <div className={style.spinner1}></div>
          </div>
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <DropdownMenu>
          <DropdownMenuTrigger
              asChild
              className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <Avatar>
                <AvatarImage
                  src={'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} />
                <AvatarFallback>
                  <span>JD</span>
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'w-56 border-none dark:text-slate-500'}>
              <DropdownMenuLabel>
                Your Profile Options
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup>
                {ProfileMenuData.map((item, index) => {
                  return (
                    <ProfileMenuItem key={index} href={item.href} label={item.label} />
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link className="flex items-center justify-center gap-2" href="/sign-in">
            <LogIn size={24} />
            <h2>
              Login/Register
            </h2>
          </Link>
        </SignedOut>
      </ClerkLoaded>

    </div>
  )
}

function MenuMobile() {
  return (
    <DisclosurePanel className="sm:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
      {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as={Link}
            href={item.href}
            aria-current={item.current ? 'page' : undefined}
            className={classNames(
              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium',
            )}
          >
            {item.name}
          </DisclosureButton>
        ))}
      </div>
    </DisclosurePanel>
  )
}
