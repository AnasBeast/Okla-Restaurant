import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
        <Popover className="relative bg-green-700">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to={"/"}>
                <span className="sr-only">Lost No More</span>
                <img
                  className="h-16 w-auto sm:h-24"
                  src="/assets/logo.png"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              <Link to={"/"} className="text-base font-medium text-gray-200 hover:text-white group transition duration-300">
                Acceuil
                <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
              </Link>
              <Link to={"/menu"} className="text-base font-medium text-gray-200 hover:text-white group transition duration-300">
                Menu
                <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
              </Link>
              <Link to={"/localisation"} className="text-base font-medium text-gray-200 hover:text-white group transition duration-300">
                Localisation
                <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
              </Link>
              <Link to={"/contact"} className="text-base font-medium text-gray-200 hover:text-white group transition duration-300">
                Contactez-nous
                <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
              </Link>
              
            </Popover.Group>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              
              {/* Right Item */}
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden"
            >
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-green-700 shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-16 w-auto"
                        src="./assets/logo.png"
                        alt="Logo"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  
                </div>
                <div className="py-6 px-5">
                  <div className="grid grid-cols-1 justify-items-center gap-4">
                  <Link to={"/"} className="text-lg font-medium text-gray-200 hover:text-white ">
                    Acceuil
                  </Link>
                  <Link to={"/menu"} className="text-lg font-medium text-gray-200 hover:text-white">
                    Menu
                  </Link>
                  <Link to={"/localisation"} className="text-lg font-medium text-gray-200 hover:text-white">
                    Localisation
                  </Link>
                  <Link to={"/contact"} className="text-lg font-medium text-gray-200 hover:text-white">
                    Contactez-nous
                  </Link>
                  </div>
                  <div className="mt-6">
                    
                    
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <div class="fixed bottom-0 right-0 mb-4 mr-4 z-10">
            <div>
                <a title="Follow me on twitter" href="tel:+5818827878" target="_blank" class="block w-12 h-12 md:w-16 md:h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
                    <img class="object-cover border-white border-2 object-center w-full h-full white p-3 rounded-full bg-green-900" src="/assets/call-icon.png"/>
                </a>
            </div>
        </div>
      </header>
  )
}

export default Navbar
