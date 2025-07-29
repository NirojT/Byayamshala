// import { Card, CardFooter, Button } from "@heroui/react";
// import { PrivateRoute } from "@/global/config";
// import { useNavigate } from "react-router-dom"; 
// import React from "react";
// import { operations } from "@/pages/layout/private/add/operations";

// const CustomGymOperationsCard = () => {
//     const navigate = useNavigate();
//     return (
//         <>
//             {
//                 operations.map((operation) => (
//                     <button key={operation.id} onClick={() =>
//                         navigate(`/${PrivateRoute}/add/gym/operation/${operation.name}`)
//                     }>
//                         <Card

//                             className="rounded-lg  shadow-md flex flex-col items-center justify-center 
//                     cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
//                             isFooterBlurred radius="lg">
//                             <img src={operation.image} alt="operation images" className="brightness-50" />
//                             <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
//                                 <Button
//                                     className="text-tiny text-white capitalize font-semibold text-base "
//                                     color="default"
//                                     radius="lg"
//                                     size="sm"
//                                     variant="flat"
//                                 >
//                                     {operation.name}
//                                 </Button>
//                             </CardFooter>
//                         </Card>
//                     </button>
//                 ))
//             }
//         </>
//     );
// }
// export default React.memo(CustomGymOperationsCard);