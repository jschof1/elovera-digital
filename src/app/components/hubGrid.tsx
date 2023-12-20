// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// type GridItem = {
//     id: number;
//     title: string;
//     content: string;
//     colSpan: number;
//     rowSpan: number;
// };

// const gridItemVariants = {
//     hidden: { scale: 0.95, opacity: 0 },
//     visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
//     hover: { scale: 1.05 }
// };

// export default function HubGrid({ items }) {

//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full h-full">
//             {items.map((item) => (
//                 <motion.div
//                     key={item.id}
//                     className="p-4 m-8 border cursor-pointer bg-white shadow-2xl rounded"
//                     variants={gridItemVariants}
//                     whileHover="hover"
//                 >
//                 </motion.div>
//             ))}
//         </div>
//     );
// }