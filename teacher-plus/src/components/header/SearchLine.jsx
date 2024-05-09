// import React, { useState, useEffect } from 'react';
// import { GetTeachers } from "../../data/GetTeachers";
//
// export const MainScreen = () => {
//     const [product, setProducts] = useState([]);
//     useEffect(() => {
//         GetTeachers()
//             .then((data) => setProducts(data))
//     }, []);
//
//     const [query, set_query] = useState('')
//     const filterDate = product.filter((item) => {
//         return item.name.toLowerCase().startsWith(query.toLowerCase())
//     })
//
//     return (
//         <div>
//             <form className="flex justify-center items-center">
//                 <label htmlFor="search" className="mr-2">חיפוש מוצר:</label>
//                 <input id={'search_inp'} type="text" placeholder="חיפוש מוצר"
//                        className="w-1/3 h-10 rounded-lg border-2 border-gray-300 px-2"
//                        onChange={event => set_query(event.target.value)}/>
//             </form>
//         </div>
//     )
// }
