const withCategory = (category, config = {}) => ({
  ...config,
  table: {
    category,
    ...(config.table || {}),
  },
})

export const propControl = (config = {}) => withCategory('Props', config)
export const eventControl = (config = {}) => withCategory('Events', config)
export const slotControl = (config = {}) => withCategory('Slots', config)
