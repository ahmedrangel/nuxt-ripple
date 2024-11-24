export const schema = {
  mode: {
    $default: 'click',
    $schema: {
      title: 'Ripple mode',
      description: 'Ripple mode',
      tsType: '"click" | "hover" | "pulse"',
    },
  },
  color: {
    $default: 'rgba(255, 255, 255, 0.4)',
    $schema: {
      title: 'Ripple color',
      description: 'Accepts HEX, RGB or RGBA Values. Use RGBA with low opacity to create a transparent ripple',
      tsType: 'string',
    },
  },
  duration: {
    $default: 350,
    $schema: {
      title: 'Ripple duration',
      description: 'Propagation duration in miliseconds',
      tsType: 'number',
    },
  },
  scale: {
    $default: 1,
    $schema: {
      title: 'Ripple scale',
      description: 'Ripple scale',
      tsType: 'number',
    },
  },
  overflow: {
    $default: false,
    $schema: {
      title: 'Ripple overflow',
      description: 'If false the ripple will not propagate outside the element; otherwise it will propagate outside the element',
      tsType: 'boolean',
    },
  },
  pulseInterval: {
    $default: 1000,
    $schema: {
      title: 'Ripple pulse interval speed',
      description: 'Require "pulse" mode enabled. Pulse interval speed in miliseconds',
      tsType: 'number',
    },
  },
}
