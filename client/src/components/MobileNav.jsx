import React from 'react'
import Logo from './Logo'
import Drawer from './Drawer'
import { useAuth } from '@/store';

export default function MobileNav() {
    const { user } = useAuth();
  
  return (
    <div className=' fixed z-10 lg:hidden bg-white shadow w-full'>
        <div className='px-6 py-5 flex items-center justify-between'>
            <Logo/>
            <Drawer user={user}/>
        </div>
    </div>
  )
}