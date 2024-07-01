import contour2svg from './contour2svg'
import type { Contours } from './types'

/**
 * contours轮廓转 svg path
 */
export default function contours2svg(contours: Contours, precision?: number) {
  if (!contours.length)
    return ''

  return contours.map(contour => contour2svg(contour, precision)).join('')
}
