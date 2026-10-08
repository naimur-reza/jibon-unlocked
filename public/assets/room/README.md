# Production render specification

All scene assets must use a single fixed isometric camera, identical lighting, same canvas dimensions (e.g. 1600x1200), and transparent backgrounds for decorations.

- base.webp: walls, floor, window, bed, desk and permanent furniture
- laptop.webp: laptop + its contact shadow
- guitar.webp: guitar + its contact shadow
- plant.webp: plant + its contact shadow
- books.webp: books + their contact shadows
- lights.webp: fairy lights (ideally additive glow separated from bulbs)

Do not cut these objects from a flattened reference image. Render independent passes from the same source scene. Where objects overlap furniture, use depth masks or render order.

Current app uses hand-drawn SVG layers until these production assets exist.
