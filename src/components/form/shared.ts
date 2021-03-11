export const STYLE_FIELD_UNDERLINE = '0 2px 0 -1px #e5e5e5'
export const STYLE_FIELD_UNDERLINE_HAS_VALUE = `0 2px 0 -1px var(--sonic-silver)`
export const STYLE_FIELD_PLACEHOLDER_COLOR = 'rgba(0, 0, 0, 0.3)'

export const STYLE_HAS_VALUE_PADDING = 'var(--size-md) 0 var(--size-xsm)'
export const STYLE_HEIGHT = '3.2rem'

export const STYLE_DROPDOWN_BG = '#3c5677'
export const SCROLLBARS_DROPDOWN = `
  ::-webkit-scrollbar {
    width: 8px;
    height: 4px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-track {
    display: block;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border: none;
    border-radius: 0;
    border-right: 4px solid ${STYLE_DROPDOWN_BG};
    background: rgba(255, 255, 255, 0.48);
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`
