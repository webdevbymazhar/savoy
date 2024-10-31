"use client"
import { Truck, LifeBuoy, RotateCcw, Lock } from "lucide-react"
import {motion} from "framer-motion"

export default function Component() {
  return (
   <div className="flex justify-center items-center mt-20 mb-20">
     <div className="flex h-[40vh] items-center justify-center ml-8 ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start space-x-4">
            <motion.div whileHover={{ scale: 1.20 }}
            transition={{ duration: 0.3 }}>
            <Truck className="h-10 w-10 flex-shrink-0 text-gray-600" />
            </motion.div>
            <div>
              <h3 className="font-bold uppercase">Free Shipping</h3>
              <p className="mt-1 text-sm text-gray-600">
                Free shipping on all US order or order above $100
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
          <motion.div whileHover={{ scale: 1.20 }}
            transition={{ duration: 0.3 }}>
            <LifeBuoy className="h-10 w-10 flex-shrink-0 text-gray-600" />
            </motion.div>
            <div>
              <h3 className="font-bold uppercase">Support 24/7</h3>
              <p className="mt-1 text-sm text-gray-600">
                Contact us 24 hours a day, 7 days a week
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
          <motion.div whileHover={{ scale: 1.20 }}
            transition={{ duration: 0.3 }}>
            <RotateCcw className="h-10 w-10 flex-shrink-0 text-gray-600" />
            </motion.div>
            <div>
              <h3 className="font-bold uppercase">30 Days Return</h3>
              <p className="mt-1 text-sm text-gray-600">
                Simply return it within 30 days for an exchange.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
          <motion.div whileHover={{ scale: 1.20 }}
            transition={{ duration: 0.3 }}>
            <Lock className="h-10 w-10 flex-shrink-0 text-gray-600" />
            </motion.div>
            <div>
              <h3 className="font-bold uppercase">100% Payment Secure</h3>
              <p className="mt-1 text-sm text-gray-600">
                We ensure secure payment with PEV
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  )
}