
import MyChart from '@/app/components/MyChart'
import { DollarSign, ShoppingCart, User, Wallet } from 'lucide-react'
import React from 'react'


const Dashboard = () => {
  
  return (
    <div>
      <div className='flex justify-between items-center px-5 mt-3'>
        <div className='w-[17vw] h-[20vh] bg-[#F9FAFB]  shadow-lg  rounded-md p-1 flex justify-center items-center gap-4'>
        <div className='bg-[#F3EEF5]  p-2 rounded-md'><ShoppingCart color='purple' /></div>
        <div >
          <p className='text-xl font-bold'>New Orders</p>
          <p className='text-xl font-medium'>12316</p>
        </div>
        </div>
        <div className='w-[17vw] h-[20vh]  bg-[#F9FAFB]  shadow-lg   rounded-md p-1 flex justify-center items-center gap-4'>
        <div className='bg-[#E4F5ED] p-2 rounded-md'><DollarSign color='green' /></div>
        <div >
          <p className='text-xl font-bold'>Total Income</p>
          <p className='text-xl font-medium'>12316</p>
        </div>
        </div>
        <div className='w-[17vw] h-[20vh]  bg-[#F9FAFB]  shadow-lg   rounded-md p-1 flex justify-center items-center gap-4'>
        <div className='bg-[#ECEFFD] p-2 rounded-md'><Wallet color='purple' /></div>
        <div >
          <p className='text-xl font-bold'>Total Expense</p>
          <p className='text-xl font-medium'>12316</p>
        </div>
        </div>
        <div className='w-[17vw] h-[20vh]  bg-[#F9FAFB]  shadow-lg  rounded-md p-1 flex justify-center items-center gap-4'>
        <div className='bg-[#FCF4EE] p-2 rounded-md'><User color='orange' /></div>
        <div >
          <p className='text-xl font-bold'>New Users</p>
          <p className='text-xl font-medium'>12316</p>
        </div>
        </div>
      </div>
      <div className='flex items-center justify-between px-5 mt-6'>
        <div className=' w-[74%]  bg-[#F9FAFB]  shadow-lg rounded-md flex justify-center items-center  h-[55vh]'>
        <MyChart/>
        </div>
        <div className=' w-[22%]  bg-[#F9FAFB]  shadow-lg rounded-md  h-[60vh] flex justify-center items-center '>
         Latest Orders
        </div>
      </div>
    </div>
  )
}

export default Dashboard
