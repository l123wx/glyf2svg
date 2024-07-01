import type { Contour } from './types'

/**
 * 将路径转换为svg路径 `d` 属性
 */
export default function contour2svg(contour: Contour, precision = 2) {
  if (!contour.length)
    return ''

  const ceil = function (number: number) {
    return +(number).toFixed(precision)
  }
  const pathArr = []
  let curPoint
  let prevPoint
  let nextPoint
  let x = 0 // x相对坐标
  let y = 0 // y相对坐标
  for (let i = 0, l = contour.length; i < l; i++) {
    curPoint = contour[i]
    prevPoint = i === 0 ? contour[l - 1] : contour[i - 1]
    nextPoint = i === l - 1 ? contour[0] : contour[i + 1]

    // 起始坐标
    if (i === 0) {
      if (curPoint.onCurve) {
        x = curPoint.x
        y = curPoint.y
        pathArr.push(`M${ceil(x)} ${ceil(y)}`)
      }
      else if (prevPoint.onCurve) {
        x = prevPoint.x
        y = prevPoint.y
        pathArr.push(`M${ceil(x)} ${ceil(y)}`)
      }
      else {
        x = (prevPoint.x + curPoint.x) / 2
        y = (prevPoint.y + curPoint.y) / 2
        pathArr.push(`M${ceil(x)} ${ceil(y)}`)
      }
    }

    // 直线
    if (curPoint.onCurve && nextPoint.onCurve) {
      pathArr.push(`l${ceil(nextPoint.x - x)
                 } ${ceil(nextPoint.y - y)}`)
      x = nextPoint.x
      y = nextPoint.y
    }
    else if (!curPoint.onCurve) {
      if (nextPoint.onCurve) {
        pathArr.push(`q${ceil(curPoint.x - x)
                     } ${ceil(curPoint.y - y)
                     } ${ceil(nextPoint.x - x)
                     } ${ceil(nextPoint.y - y)}`)
        x = nextPoint.x
        y = nextPoint.y
      }
      else {
        const x1 = (curPoint.x + nextPoint.x) / 2
        const y1 = (curPoint.y + nextPoint.y) / 2
        pathArr.push(`q${ceil(curPoint.x - x)
                         } ${ceil(curPoint.y - y)
                         } ${ceil(x1 - x)
                         } ${ceil(y1 - y)}`)
        x = x1
        y = y1
      }
    }
  }
  pathArr.push('Z')
  return pathArr.join(' ')
}
