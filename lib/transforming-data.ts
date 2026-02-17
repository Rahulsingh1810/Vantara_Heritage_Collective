// data/room-inspirations.ts

export interface RoomInspiration {
  slug: string
  title: string
  thumbnailText: string
  summerSoireeTitle: string
  summerSoireeText: string
  thumbnailImg: string
  mainImg: string
}

export const rooms: readonly RoomInspiration[] = [
  {
    slug: 'elegant-surfaces',
    title: 'Elegant Surfaces',
    thumbnailText:
      "Elegant Surfaces explores how heritage handicrafts flow across a plethora of planes. It's a journey of how each artefact lends itself into various colours and textures to be seamlessly woven into the modern living fabric. Here, we look into the textural look and feel that highlight and accentuate these pieces, positioning every one of them as part of the natural fluidity of the surface. From smooth finishes to natural mineral grains, every surface can contain a magnitude of aesthetic value when paired with the right product.",
    summerSoireeTitle: 'Summer Soirée',
    summerSoireeText:
      "Summer Soirée is an invitation to slow down and let the artefact take centre stage. Bathed in warm sunlight, these pieces are allowed to simply exist as they would in real life. They're placed in places with an outpour of sunlight, which enable casting shadows, and quietly shaping the mood of the space. This curation celebrates the ease of summer living. The environment is a perfect complement to colours that imply the season - yellows, reds, and oranges. In this bright and vibrant background, each artefact finds its groove, bedecked in the glistening aura of sunlight, with shadows adding just the right amount of drama.",
    thumbnailImg: '/ES- Thumbnail.png',
    mainImg: '/Summer Soiree - ES.png'
  },
  {
    slug: 'soulful-landscapes',
    title: 'Soulful Landscapes',
    thumbnailText:
      "Soulful Landscapes looks to situate artefacts within lived environments. It's a descriptive narration, kind of like painting a picture of a larger environmental context. Think of it as creating a set or a mise-en-scene of resplendent aesthetic. Here, each piece is part of the story, providing grounded appeals or fluid transitions in wide, open spaces. These artefacts are intended to lend character to their surroundings while exuding the essence of the space itself. Their interactions within the space, both bold and subtle, craft the perfect landscape outlook in modern living decor.",
    summerSoireeTitle: 'Summer Soirée',
    summerSoireeText:
      "Summer Soirée is an invitation to slow down and let the artefact take centre stage. Bathed in warm sunlight, these pieces are allowed to simply exist as they would in real life. They're placed in places with an outpour of sunlight, which enable casting shadows, and quietly shaping the mood of the space. This curation celebrates the ease of summer living. The environment is a perfect complement to colours that imply the season - yellows, reds, and oranges. In this bright and vibrant background, each artefact finds its groove, bedecked in the glistening aura of sunlight, with shadows adding just the right amount of drama.",
    thumbnailImg: '/SL - Thumbnail.png',
    mainImg: '/Summer Soiree - SL.png'
  },
  {
    slug: 'statement-walls',
    title: 'Statement Walls',
    thumbnailText:
      'Statement Walls is about accentuating walls to derive the most soothing and pleasing aesthetic possible. This curation explores how a single piece, or even a thoughtful pairing can transform a wall into a moment of expression. Colours, scale, and textures are thoughtfully highlighted here to create impact that flows well with the rhythm of each room. The artefacts are allowed to calmly assert their presence amidst solid blocks of negative space, making each segment feel grounded and intentional in the larger spatial setup and narrative.',
    summerSoireeTitle: 'Summer Soirée',
    summerSoireeText:
      "Summer Soirée is an invitation to slow down and let the artefact take centre stage. Bathed in warm sunlight, these pieces are allowed to simply exist as they would in real life. They're placed in places with an outpour of sunlight, which enable casting shadows, and quietly shaping the mood of the space. This curation celebrates the ease of summer living. The environment is a perfect complement to colours that imply the season - yellows, reds, and oranges. In this bright and vibrant background, each artefact finds its groove, bedecked in the glistening aura of sunlight, with shadows adding just the right amount of drama.",
    thumbnailImg: '/SW - Thumbnail.png',
    mainImg: '/Summer Soiree - SW.png'
  },
  {
    slug: 'vignette-shelves',
    title: 'Vignette Shelves',
    thumbnailText:
      'Vignette Shelves looks at how artefacts occupy smaller, intentional moments in a space. They are more like compositions of slow, quiet pauses- intended to add a delicate, feathery touch to shelved interiors. Here, shelves become little stages that allow the piece to stand, breathe, and simply be noticed. The curation focuses on respecting the form and placement of the artefact, and through it, add value to the functional balance of each shelf. Each fixture feels considered and instinctive, creating visual anchors that gently punctuate the rhythm of everyday living.',
    summerSoireeTitle: 'Summer Soirée',
    summerSoireeText:
      "Summer Soirée is an invitation to slow down and let the artefact take centre stage. Bathed in warm sunlight, these pieces are allowed to simply exist as they would in real life. They're placed in places with an outpour of sunlight, which enable casting shadows, and quietly shaping the mood of the space. This curation celebrates the ease of summer living. The environment is a perfect complement to colours that imply the season - yellows, reds, and oranges. In this bright and vibrant background, each artefact finds its groove, bedecked in the glistening aura of sunlight, with shadows adding just the right amount of drama.",
    thumbnailImg: '/VS - Thumbnail.png',
    mainImg: '/Summer Soiree - VS.png'
  }
] as const
