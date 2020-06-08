
const a = {
'@primary-color': '#1890ff', // 全局主色
'@success-color': '#52c41a', // 成功色
'@warning-color': '#faad14', // 警告色
'@error-color': '#f5222d', // 错误色
}

const PRIMARY_COLOR = '#1890ff'
const SUCCESS_COLOR = '#52c41a'
const WARNING_COLOR = '#faad14'
const ERROR_COLOR = '#f5222d'
const WHILE_COLOR = '#ffffff'
const PADDING = '2px'


const PRIMARY_STYLE = {
  background: PRIMARY_COLOR,
  color: WHILE_COLOR,
  padding: PADDING
}

const SUCCESS_STYLE = {
  background: SUCCESS_COLOR,
  color: WHILE_COLOR,
  padding: PADDING
}

const WARNING_STYLE = {
  background: WARNING_COLOR,
  color: WHILE_COLOR,
  padding: PADDING
}

const ERROR_STYLE = {
  background: ERROR_COLOR,
  color: WHILE_COLOR,
  padding: PADDING
}

const TEXT_STYLE = {
  background: WHILE_COLOR,
  color: '#333333',
  padding: PADDING
}

function getStyleString(style) {
  return Object.keys(style).reduce((pre, cur) => {
    return `${pre}; ${cur}: ${style[cur]}`
  }, '')
}

export const PRIMARY = getStyleString(PRIMARY_STYLE)
export const SUCCESS = getStyleString(SUCCESS_STYLE)
export const WARNING = getStyleString(WARNING_STYLE)
export const ERROR = getStyleString(ERROR_STYLE)
export const TEXT = getStyleString(TEXT_STYLE)
