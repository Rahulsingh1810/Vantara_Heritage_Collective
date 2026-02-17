// 'use client'

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { ChevronDown } from 'lucide-react'
// import Image from 'next/image'

// const rooms = [
//   {
//     title: 'Elegant Surfaces',
//     thumbnailText:
//       "Elegant Surfaces explores how heritage handicrafts flow across a plethora of planes. It's a journey of how each artefact lends itself into various colours and textures to be seamlessly woven into the modern living fabric. Here, we look into the textural look and feel that highlight and accentuate these pieces, positioning every one of them as part of the natural fluidity of the surface. From smooth finishes to natural mineral grains, every surface can contain a magnitude of aesthetic value when paired with the right product.",
//     summerSoireeTitle: 'Summer Soirée',
//     summerSoireeText:
//       "Summer Soirée is an invitation to slow down and let the artefact take centre stage. Bathed in warm sunlight, these pieces are allowed to simply exist as they would in real life. They're placed in places with an outpour of sunlight, which enable casting shadows, and quietly shaping the mood of the space. This curation celebrates the ease of summer living. The environment is a perfect complement to colours that imply the season - yellows, reds, and oranges. In this bright and vibrant background, each artefact finds its groove, bedecked in the glistening aura of sunlight, with shadows adding just the right amount of drama.",
//     thumbnailImg: '/ES- Thumbnail.png',
//     mainImg: '/Summer Soiree - ES.png'
//   },
//   {
//     title: 'Soulful Landscapes',
//     thumbnailText:
//       "Soulful Landscapes looks to situate artefacts within lived environments. It's a descriptive narration, kind of like painting a picture of a larger environmental context. Think of it as creating a set or a mise-en-scene of resplendent aesthetic. Here, each piece is part of the story, providing grounded appeals or fluid transitions in wide, open spaces. These artefacts are intended to lend character to their surroundings while exuding the essence of the space itself. Their interactions within the space, both bold and subtle, craft the perfect landscape outlook in modern living decor.",
//     summerSoireeTitle: 'Summer Soirée',
//     summerSoireeText:
//       "Summer Soirée is an invitation to slow down and let the artefact take centre stage. Bathed in warm sunlight, these pieces are allowed to simply exist as they would in real life. They're placed in places with an outpour of sunlight, which enable casting shadows, and quietly shaping the mood of the space. This curation celebrates the ease of summer living. The environment is a perfect complement to colours that imply the season - yellows, reds, and oranges. In this bright and vibrant background, each artefact finds its groove, bedecked in the glistening aura of sunlight, with shadows adding just the right amount of drama.",
//     thumbnailImg: '/SL - Thumbnail.png',
//     mainImg: '/Summer Soiree - SL.png'
//   },
//   {
//     title: 'Statement Walls',
//     thumbnailText:
//       'Statement Walls is about accentuating walls to derive the most soothing and pleasing aesthetic possible. This curation explores how a single piece, or even a thoughtful pairing can transform a wall into a moment of expression. Colours, scale, and textures are thoughtfully highlighted here to create impact that flows well with the rhythm of each room. The artefacts are allowed to calmly assert their presence amidst solid blocks of negative space, making each segment feel grounded and intentional in the larger spatial setup and narrative.',
//     summerSoireeTitle: 'Summer Soirée',
//     summerSoireeText:
//       "Summer Soirée is an invitation to slow down and let the artefact take centre stage. Bathed in warm sunlight, these pieces are allowed to simply exist as they would in real life. They're placed in places with an outpour of sunlight, which enable casting shadows, and quietly shaping the mood of the space. This curation celebrates the ease of summer living. The environment is a perfect complement to colours that imply the season - yellows, reds, and oranges. In this bright and vibrant background, each artefact finds its groove, bedecked in the glistening aura of sunlight, with shadows adding just the right amount of drama.",
//     thumbnailImg: '/SW - Thumbnail.png',
//     mainImg: '/Summer Soiree - SW.png'
//   },
//   {
//     title: 'Vignette Shelves',
//     thumbnailText:
//       'Vignette Shelves looks at how artefacts occupy smaller, intentional moments in a space. They are more like compositions of slow, quiet pauses- intended to add a delicate, feathery touch to shelved interiors. Here, shelves become little stages that allow the piece to stand, breathe, and simply be noticed. The curation focuses on respecting the form and placement of the artefact, and through it, add value to the functional balance of each shelf. Each fixture feels considered and instinctive, creating visual anchors that gently punctuate the rhythm of everyday living.',
//     summerSoireeTitle: 'Summer Soirée',
//     summerSoireeText:
//       "Summer Soirée is an invitation to slow down and let the artefact take centre stage. Bathed in warm sunlight, these pieces are allowed to simply exist as they would in real life. They're placed in places with an outpour of sunlight, which enable casting shadows, and quietly shaping the mood of the space. This curation celebrates the ease of summer living. The environment is a perfect complement to colours that imply the season - yellows, reds, and oranges. In this bright and vibrant background, each artefact finds its groove, bedecked in the glistening aura of sunlight, with shadows adding just the right amount of drama.",
//     thumbnailImg: '/VS - Thumbnail.png',
//     mainImg: '/Summer Soiree - VS.png'
//   }
// ]

// export function RoomInspirationMasterDetail() {
//   const [active, setActive] = useState(0)

//   return (
//     <section className="bg-background py-20">
//       <div className="mx-auto max-w-7xl px-4">
//         <h2 className="mb-14 text-center text-3xl font-bold text-(--color-wine-red)">Room Inspirations</h2>

//         {/* DESKTOP MASTER DETAIL */}
//         <div className="hidden gap-12 md:grid md:grid-cols-3">
//           {/* MASTER - Thumbnail List */}
//           <div className="space-y-4">
//             {rooms.map((room, i) => (
//               <motion.button
//                 key={i}
//                 onClick={() => setActive(i)}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className={`relative w-full overflow-hidden rounded-2xl border transition-all ${
//                   active === i ? 'border-(--color-wine-red) shadow-xl' : 'border-(--color-wine-red)/20 hover:shadow-md'
//                 }`}
//               >
//                 {/* Thumbnail Image */}
//                 <div className="relative h-70 w-full">
//                   <Image src={room.thumbnailImg} alt={room.title} fill className="object-cover" />
//                   <div className={`absolute inset-0 transition-all ${active === i ? 'bg-black/0' : 'bg-black/20'}`} />
//                 </div>

//                 {/* Title Overlay */}
//                 <div
//                   className={`p-4 text-left transition-all ${
//                     active === i
//                       ? 'bg-linear-to-br from-(--color-wine-red) to-[#5a0018] text-(--color-ivory)'
//                       : 'bg-(--color-ivory) text-(--color-wine-red)'
//                   }`}
//                 >
//                   <span className="block font-semibold">{room.title}</span>
//                   {active === i && (
//                     <motion.div
//                       layoutId="active-indicator"
//                       className="absolute top-3 right-3 h-2 w-2 rounded-full bg-(--color-ivory)"
//                     />
//                   )}
//                 </div>
//               </motion.button>
//             ))}
//           </div>

//           {/* DETAIL - Main Content */}
//           <div className="md:col-span-2">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={active}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.35 }}
//                 className="overflow-hidden rounded-3xl border border-(--color-wine-red)/20 bg-(--color-ivory) shadow-xl"
//               >
//                 {/* Main Image */}
//                 <div className="relative h-100 w-full">
//                   <Image src={rooms[active].mainImg} alt={rooms[active].title} fill className="object-fill" />
//                 </div>

//                 {/* Content */}
//                 <div className="p-12">
//                   <h3 className="mb-6 text-3xl font-bold text-(--color-wine-red)">{rooms[active].title}</h3>

//                   {/* Thumbnail Text Section */}
//                   <div className="mb-8">
//                     <p className="text-lg leading-relaxed text-(--color-wine-red)/75">{rooms[active].thumbnailText}</p>
//                   </div>

//                   <div className="my-8 h-px bg-(--color-wine-red)/15" />

//                   {/* Summer Soirée Section */}
//                   <div>
//                     <h4 className="mb-4 text-xl font-semibold text-(--color-wine-red)">
//                       {rooms[active].summerSoireeTitle}
//                     </h4>
//                     <p className="text-lg leading-relaxed text-(--color-wine-red)/75">
//                       {rooms[active].summerSoireeText}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* MOBILE ACCORDION */}
//         <div className="space-y-4 md:hidden">
//           {rooms.map((room, i) => {
//             const open = active === i

//             return (
//               <div
//                 key={i}
//                 className="overflow-hidden rounded-2xl border border-(--color-wine-red)/20 bg-(--color-ivory)"
//               >
//                 {/* Thumbnail with title */}
//                 <button onClick={() => setActive(open ? -1 : i)} className="w-full text-left">
//                   <div className="relative h-40 w-full">
//                     <Image src={room.thumbnailImg} alt={room.title} fill className="object-cover" />
//                     <div className="absolute inset-0 flex items-center justify-between bg-black/30 px-6">
//                       <span className="font-semibold text-(--color-ivory)">{room.title}</span>
//                       <motion.div animate={{ rotate: open ? 180 : 0 }}>
//                         <ChevronDown className="h-5 w-5 text-(--color-ivory)" />
//                       </motion.div>
//                     </div>
//                   </div>
//                 </button>

//                 <AnimatePresence>
//                   {open && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: 'auto', opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="overflow-hidden"
//                     >
//                       <div className="relative h-64 w-full">
//                         <Image src={room.mainImg} alt={room.title} fill className="object-cover" />
//                       </div>

//                       <div className="p-6 text-(--color-wine-red)/75">
//                         <p className="mb-6 text-sm leading-relaxed">{room.thumbnailText}</p>

//                         <div className="my-6 h-px bg-(--color-wine-red)/15" />

//                         <h4 className="mb-3 font-semibold text-(--color-wine-red)">{room.summerSoireeTitle}</h4>
//                         <p className="text-sm leading-relaxed">{room.summerSoireeText}</p>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </section>
//   )
// }
