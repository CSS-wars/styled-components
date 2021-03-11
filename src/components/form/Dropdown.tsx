import React, { memo, FC, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import throttle from 'lodash/fp/throttle'
import chevronDownSvg from '../../assets/svg/chevron-down.svg'
import Svg from '../Svg'

import {
  STYLE_FIELD_UNDERLINE,
  STYLE_FIELD_UNDERLINE_HAS_VALUE,
  STYLE_DROPDOWN_BG,
  SCROLLBARS_DROPDOWN,
  STYLE_HAS_VALUE_PADDING,
  STYLE_HEIGHT,
} from './shared'
import Placeholder from './Placeholder';

export const CN_DROPDOWN_HEADER = 'dropdown-header'
export const CN_DROPDOWN_CHEVRON = 'dropdown-chevron'
export const CN_DROPDOWN_MENU = 'dropdown-menu'

const STYLE_LABEL_OPEN_COLOR = '#ffffffc9'
const STYLE_LABEL_OPEN_SVG_COLOR = '#ffffffc9'
const STYLE_PLACEHOLDER_ACTIVE = '#ffffff73'
const STYLE_COLOR = '#ffffff99'
const STYLE_COLOR_ACTIVE = '#ffffffcf'
const STYLE_COLOR_HOVER = '#ffffffcf'
const STYLE_BOX_SHADOW_IS_OPEN = '0px 2px 0 -1px #ffffff40'

const DropdownWrap = styled.div<{ isOpen: boolean; isDisabled: boolean }>`
  z-index: 1;
  position: relative;
  outline: none;
  ${p => p.isOpen && `
    z-index: 3;
    background-color: ${STYLE_DROPDOWN_BG}`
  };
  ${p => p.isDisabled && 'pointer-events: none'};
`
const HeaderWrap = styled.div`
  padding: var(--size-md) var(--size-lg);
  fill: var(--gray-x11);
  cursor: pointer;
`
const HeaderInnerWrap = styled.div<{ isOpen: boolean; hasActiveItem: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: ${STYLE_HEIGHT};
  box-shadow: ${p => p.isOpen ? STYLE_BOX_SHADOW_IS_OPEN : STYLE_FIELD_UNDERLINE};

  &:hover {
    box-shadow: ${p => p.isOpen ? STYLE_BOX_SHADOW_IS_OPEN : STYLE_FIELD_UNDERLINE_HAS_VALUE};

    .${CN_DROPDOWN_CHEVRON} {
      fill: var(--sonic-silver);
    };
  };

  ${p => p.hasActiveItem && `
    padding: ${STYLE_HAS_VALUE_PADDING};
    color: var(--sonic-silver);
  `};
`
const Label = styled.div<{ isOpen: boolean }>`
  ${p => p.isOpen && `
    color: ${STYLE_LABEL_OPEN_COLOR};
  `};
`
const PlaceholderStyled = styled(Placeholder)<{ isOpen: boolean }>`
  ${p => p.isOpen && `color: ${STYLE_PLACEHOLDER_ACTIVE}`}
`
const ChevronDownSvg = styled(Svg)<{ isOpen: boolean }>`
  display: flex;
  margin-left: auto;
  width: 0.9rem;
  height: 0.9rem;

  svg {
    fill: ${p => p.isOpen ? STYLE_LABEL_OPEN_SVG_COLOR : 'inherit'};
  };
`
interface Coordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}
const Menu = styled.ul<{ coordinates: Coordinates, isOpen: boolean }>`
  display: ${p => p.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  position: fixed;
  padding: var(--size-md) var(--size-lg) var(--size-lg);
  left: ${p => p.coordinates.x}px;
  top: ${p => p.coordinates.y + p.coordinates.height}px;
  width: ${p => p.coordinates.width}px;
  max-height: 21.4rem;
  color: ${STYLE_COLOR};
  background-color: ${STYLE_DROPDOWN_BG};
  overflow: auto;
  ${SCROLLBARS_DROPDOWN};
`

const Item = styled.li<{ isActive: boolean }>`
  margin-top: var(--size-md);
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: ${p => p.isActive ? STYLE_COLOR_ACTIVE : STYLE_COLOR_HOVER};
  };
  
  &:first-child {
    margin-top: 0;
  };

  ${p => p.isActive && `
    color: ${STYLE_COLOR_ACTIVE};
    font-weight: bold;
  `};
`

interface Props {
  activeItem: string;
  placeholder: string;
  list: string[];
  className?: string;
  scrollSelector?: string,
  onItemSelect(item: string): void;
}
const Dropdown: FC<Props> = ({ activeItem, placeholder, list, scrollSelector = '#app', className, onItemSelect }) => {
  const wrapRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const hasActiveItem = (activeItem !== undefined && activeItem !== '')
  const onItemSelectHandler = (item: string): void => {
    setIsOpen(false)
    onItemSelect(item)
  }
  const onBlur = () => {
    setIsOpen(false)
  }
  const onToggleOpen = () => {
    const { x, y, width, height } = wrapRef.current.getBoundingClientRect()
    setCoordinates({ x, y, width, height })
    setIsOpen(!isOpen)
  }
  const onScroll = (event: UIEvent) => {
    const { x, y, width, height } = wrapRef.current.getBoundingClientRect()
    setCoordinates({ x, y, width, height })
  }

  useEffect(() => {
    if (!scrollSelector) return
    const selector = document.querySelector(scrollSelector)
    const { x, y, width, height } = wrapRef.current.getBoundingClientRect()
    setCoordinates({ x, y, width, height })
    selector.addEventListener('scroll', throttle(100)(onScroll))

    return () => {
      selector.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <DropdownWrap
      isDisabled={!list.length}
      isOpen={isOpen}
      className={className}
      onBlur={onBlur}
      tabIndex={0}
      ref={wrapRef}
    >
      <HeaderWrap onClick={onToggleOpen} className={CN_DROPDOWN_HEADER}>
        <HeaderInnerWrap isOpen={isOpen} hasActiveItem={hasActiveItem}>
          <PlaceholderStyled isOpen={isOpen} hasValue={hasActiveItem} >
            {placeholder}
          </PlaceholderStyled>
          <Label isOpen={isOpen}>{activeItem}</Label>
          <ChevronDownSvg
            className={CN_DROPDOWN_CHEVRON}
            isOpen={isOpen}
            svg={chevronDownSvg}
          />
        </HeaderInnerWrap>
      </HeaderWrap>
      {isOpen && (
        <Menu isOpen={isOpen} coordinates={coordinates} className={CN_DROPDOWN_MENU}>
          {list.map(item => (
            <Item isActive={activeItem === item} onClick={() => onItemSelectHandler(item)} key={item}>{item}</Item>
          ))}
        </Menu>
      )}
    </DropdownWrap>
  )
}

export default memo(Dropdown)
