// "use client";
// import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
// import React, {useState} from "react";
// import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

// export default function Provider({children}: Readonly<{ children: React.ReactNode }>) {
//     const [queryClient] = useState(()=>new QueryClient())
//     return (
//         <QueryClientProvider client={queryClient}>
//             <ReactQueryDevtools />
//             {children}
//         </QueryClientProvider>
//     );
// }
