import React, { memo, FC } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { media, SCROLLBARS_MIN_LIGHT } from '../../styles'
import searchSvg from '../../assets/svg/search.svg'
import { Field, Dropdown, CN_DROPDOWN_HEADER } from '../../components/form'
import Button from '../../components/Button'

import { updateUrl } from './shared/helpers'
import { STYLE_HEADER_HEIGHT, STYLE_HEADER_HEIGHT_SM, STYLE_HEADER_ITEMS_VERTICAL_PADDING } from './shared/styles'
import { UrlParams } from '../../shared'

const CN_PAGE_HEADER = 'page-header'

const Header = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: var(--size-lg);
  height: ${STYLE_HEADER_HEIGHT};
  overflow: auto;
  ${SCROLLBARS_MIN_LIGHT};

  ${media.md} {
    padding: var(--size-sm) var(--size-lg) 0;
    height: ${STYLE_HEADER_HEIGHT_SM};
    flex-direction: row;
  };
`
const Title = styled.h1`
  padding-left: 16px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: var(--font-size-lg);

  ${media.md} {
    position: absolute;
    bottom: 0;
    padding: 0;
    padding-bottom: ${STYLE_HEADER_ITEMS_VERTICAL_PADDING};
  };
`
const Filters = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  padding-right: var(--size-lg);

  ${media.md} {
    padding-right: 0;
  };
`
const DropdownStyled = styled(Dropdown)`
  width: 16rem;

  .${CN_DROPDOWN_HEADER} {
    padding-bottom: ${STYLE_HEADER_ITEMS_VERTICAL_PADDING};
  };
`
const SearchField = styled(Field)`
  margin-left: var(--size-lg);
`

type IProps = {
  urlParams: UrlParams;
  positions: string[];
  statuses: string[];
}
const PageHeader: FC<IProps> = ({ urlParams, positions, statuses }) => {
  const history = useHistory()
  const { position, status, searchQuery } = urlParams

  const onSearch = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    updateUrl({ urlParams: { ...urlParams, searchQuery: value }, history })
  }

  const onSetPosition = (positionSelected: string): void => {
    updateUrl({ urlParams: { ...urlParams, position: positionSelected }, history })
  }

  const onSetStatus = (statusSelected: string): void => {
    updateUrl({ urlParams: { ...urlParams, status: statusSelected }, history })
  }
  const onClearFilters = (): void => {
    updateUrl({ urlParams: { ...urlParams, status: '', position: '', searchQuery: '' }, history })
  }

  return (
    <Header className={CN_PAGE_HEADER}>
      <Title>Candidates</Title>
      <Filters>
        <DropdownStyled
          list={positions}
          activeItem={position}
          placeholder="available positions"
          scrollSelector={`.${CN_PAGE_HEADER}`}
          onItemSelect={onSetPosition}
        />
        <DropdownStyled
          list={statuses}
          activeItem={status}
          placeholder="status"
          scrollSelector={`.${CN_PAGE_HEADER}`}
          onItemSelect={onSetStatus}
        />
        <SearchField
          name="search-field"
          placeholder="search for applicant"
          value={searchQuery || ''}
          svg={searchSvg}
          onChange={onSearch}
        />
        <Button onClick={onClearFilters}>Clear fiters</Button>
      </Filters>
    </Header>
  )
}

export default memo(PageHeader)
