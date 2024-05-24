// import React from "react";
// import { PortableText } from "@portabletext/react";
// import portableTextComponents from "@/app/utils/portableTextComponents";
// import clsx from "clsx";
// import { TextUI } from "@/app/types/schema";

// type Props = {
//   input: TextUI;
// };
// const ModuleTextUI = ({ input }: Props) => {
//   const { text, width, offset, columns } = input;

//   return (
//     <section className='module module--text mb-lg'>
//       <div className='row no-gutter-'>
//         <div
//           className={clsx(`col-md-${width} col-md-offset-${offset} col-xs-12`)}>
//           <div
//             className='text-wrapper'
//             style={{
//               columnCount: columns ? columns : 1,
//             }}>
//             {text && (
//               <PortableText value={text} components={portableTextComponents} />
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ModuleTextUI;
