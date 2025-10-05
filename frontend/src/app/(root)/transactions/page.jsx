"use client";
import HeaderName from '@/components/HeaderName' 
import React, { Suspense, useEffect, useState } from 'react'
import TableCard from './+___compoents/TableCard'
import MessageShow from './+___compoents/MessageShow'
import { toast } from 'react-toastify'
import { axiosClient } from '@/utils/AxiosClient'
import CustomLoader from '@/components/reuseable/CustomLoader';
import { FaHeadset, FaPhoneAlt, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from 'next/image';

const Transactions = () => {
  const [transaction,setTransaction ] = useState([])
  const [loading,setLoading] = useState(false)

  const fetchAllTransaction = async()=>{
    setLoading(true)
    try {
      
      const response = await axiosClient.get('/amount/transactions',{
        headers:{
          'Authorization':'Bearer '+ localStorage.getItem("token")
        }
      })
      const data = await response.data 
      setTransaction(data)

    } catch (error) {
       toast.error(error.response.data.msg || error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAllTransaction()
  },[])


  return (
    <>

<div className="container py-10">
            <HeaderName/>




           
<div className="relative overflow-x-auto py-10">
 <div className="px-3">
 <MessageShow/>
 </div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3 capitalize text-violet-800">
          Txn ID
        </th>
        <th scope="col" className="px-6 py-3 capitalize text-violet-800">
          Type
        </th>
        <th scope="col" className="px-6 py-3 capitalize text-violet-800 ">
          Amount
        </th>
        <th scope="col" className="px-6 py-3 capitalize text-violet-800">
          Date
        </th>
        <th scope="col" className="px-6 py-3 capitalize hidden lg:block text-violet-800">
          Remark
        </th>
      </tr>
    </thead> 
    <tbody>
    <tr>
      <td colSpan={12}>
      {
        loading && <CustomLoader/>
      }
      </td>
     </tr>
    </tbody>
        <Suspense fallback={<CustomLoader/>}>
      <tbody>
            {
             transaction && transaction.length>0 &&transaction.map((cur,i)=>{
                return <TableCard key={i} id={i} data={cur} />
              })

              
            }
        </tbody>
        </Suspense>
       
  </table>
</div>


            </div>
             
             <motion.footer 
                   initial={{ opacity: 0 }} 
                   whileInView={{ opacity: 1 }} 
                   viewport={{ once: true }} 
                   transition={{ duration: 1.5 }} 
                   className="mt-16 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-white p-8 rounded-t-3xl"
                 >
                   <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
             
                     {/* Left Section - Logo & Info */}
                     <div className="flex flex-col sm:items-start text-center sm:text-left">
                       <Image 
                         src="/logo1.png" 
                         alt="Orion Bank Logo" 
                         width={150} 
                         height={150} 
                         className="object-contain mb-2"
                       />
                       <h3 className="text-lg font-semibold text-indigo-400">Orion Bank</h3>
                       <p className="text-sm text-gray-300">© 2025 Orion Bank. All Rights Reserved.</p>
                       <p className="text-xs text-gray-400 mt-1">
                         Designed & Managed by <span className="font-semibold text-indigo-400">Aditya Kumar Dubey</span>
                       </p>
                     </div>
             
                     {/* Middle Section - Quick Links */}
                     <div className="flex flex-wrap justify-center gap-4 text-sm">
                       <a href="#about" className="hover:text-blue-400 transition">About Us</a>
                       <a href="#services" className="hover:text-blue-400 transition">Services</a>
                       <a href="#careers" className="hover:text-blue-400 transition">Careers</a>
                       <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
                     </div>
             
                     {/* Right Section - Social + Support */}
                     <div className="flex flex-col items-center gap-3">
                       <div className="flex gap-3 text-lg">
                         <a href="#" className="hover:text-blue-400"><FaLinkedin /></a>
                         <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
                         <a href="#" className="hover:text-blue-400"><FaInstagram /></a>
                       </div>
                       <motion.button 
                         whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.4)" }} 
                         transition={{ type: 'spring', stiffness: 150 }}
                         className="flex items-center gap-2 bg-blue-600 px-3 py-2 rounded-2xl shadow-lg text-sm"
                       >
                         <FaHeadset /> 24/7 Chat Support
                       </motion.button>
                     </div>
                   </div>
                 </motion.footer>


    </>
  )
}

export default Transactions