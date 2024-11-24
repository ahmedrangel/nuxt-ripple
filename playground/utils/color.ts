import chroma from 'color'

export const toRGBA = (hex: string, aplha?: number) => {
  const [r, g, b, a] = chroma(hex).rgb().array()
  return `rgba(${r},${g},${b},${aplha || a || 1})`
}

export const toHex = (value: string) => {
  return chroma(value).hex()
}

export const getRandomColor = () => {
  return `#${((Math.random() * 0xFFFFFF) << 0).toString(16).padStart(6, '0')}`
}
