'use client'
import { motion } from 'framer-motion'

import Image from 'next/image'
import fahemslogotransparent295x295 from 'public/fahem_image_transparent_295x295.png'
const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
}

function PageLoading() {
  return (
    <motion.main
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: 'linear' }} // Set the transition to linear
      className=""
    >
      <div className="max-w-7xl mx-auto px-4 py-20 transition-all">
        <div className="animate-pulse mx-auto flex space-x-4">
        <Image
                  src={fahemslogotransparent295x295}
                  quality={100}
                  width={295}
                  height={295}
                  alt=""
                  />
        </div>
      </div>
    </motion.main>
  )
}

export default PageLoading
