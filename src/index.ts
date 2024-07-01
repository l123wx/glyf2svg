import type { Glyph } from './types'
import contours2svg from './contours2svg'

export default function glyf2svg(glyf: Glyph) {
  if (!glyf)
    return ''

  const pathArray = []

  if (glyf.contours && glyf.contours.length)
    pathArray.push(contours2svg(glyf.contours))

  return pathArray.join(' ')
}
