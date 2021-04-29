import React, { FC } from 'react'
import styled from 'styled-components'
import { media, SCROLLBARS_MIN_LIGHT } from '../../styles'

import { STYLE_HEADER_HEIGHT, STYLE_HEADER_HEIGHT_SM } from './shared/styles'
import { TABLE_HEADERS } from './shared/constants'
import { SortDirections } from './shared/enums'
import { Candidate } from './shared/types'
import { UrlParams } from '../../shared'

const STYLE_FIRST_CELL = `
  z-index: 1;
  position: sticky;
  left: 0;
  padding-left: var(--size-lg);
  white-space: nowrap;
`
const STYLE_LAST_CELL = `
  padding-right: var(--size-lg);
`
const STYLE_SORTED_COLUMN_COLOR = '#42606796'

const TableWrap = styled.div`
  overflow: auto;
  height: ${`calc(100% - ${STYLE_HEADER_HEIGHT})`};
  ${SCROLLBARS_MIN_LIGHT};

  ${media.md} {
    height: ${`calc(100% - ${STYLE_HEADER_HEIGHT_SM})`};
  };
`
const Table = styled.table``
const Row = styled.tr`
  border-bottom: 1px solid var(--white-smoke);
`
const RowHeader = styled.tr``
const CellHeader = styled.th<{ isActiveSort: boolean; isAsc: boolean }>`
  position: sticky;
  top: 0;
  background-color: #eefbff;
  padding: var(--size-md);
  white-space: nowrap;
  font-weight: bold;
  color: #4260678c;
  text-transform: uppercase;
  box-shadow: inset 0 -1px 0 0 var(--azureish-white), inset 0 1px 0 0 var(--azureish-white);
  cursor: pointer;

  &:first-child {
    ${STYLE_FIRST_CELL};
    z-index: 2;
    ${p => !p.isActiveSort && `
      box-shadow: inset -1px -1px 0 0 var(--azureish-white), inset 0 1px 0 0 var(--azureish-white);
    `};
  };

  &:last-child {
    ${STYLE_LAST_CELL};
  };

  &:hover {
    background-color: var(--azureish-white);
    color: ${STYLE_SORTED_COLUMN_COLOR};
  };

  ${p => p.isActiveSort && `
    background-color: var(--azureish-white);
    box-shadow: inset 0 ${p.isAsc ? '-4px' : '4px'} 0 -2px var(--medium-sky-blue);
    color: ${STYLE_SORTED_COLUMN_COLOR};
  `};
`
const Cell = styled.td`
  padding: 10px 12px;
  box-shadow: inset -1px 0 0 var(--white-smoke);

  &:first-child {
    ${STYLE_FIRST_CELL};
    background-color: var(--white);
  };

  &:last-child {
    ${STYLE_LAST_CELL};
  };
`
const CellStatus = styled(Cell)<{ accentColor: string }>`
  font-weight: bold;
  color: ${p => p.accentColor};
`

type IProps = {
  urlParams: UrlParams;
  candidatesFiltered: Candidate[];
  onSortToggle(id: string): void;
}
const CandidatesTable: FC<IProps> = ({ urlParams, candidatesFiltered, onSortToggle }) => {
  const { sortedColumnId, sortDirection } = urlParams

  return (
    <TableWrap>
      <Table>
        <thead>
          <RowHeader>
            {TABLE_HEADERS.map(({ id, displayName }) => (
              <CellHeader
                key={id}
                isActiveSort={sortedColumnId === id}
                isAsc={sortDirection === SortDirections.asc}
                onClick={() => onSortToggle(id)}
              >
                {displayName}
              </CellHeader>
            ))}
          </RowHeader>
        </thead>
        <tbody>
          {candidatesFiltered
            .map(({
              id,
              name,
              email,
              birth_date,
              year_of_experience,
              position_applied,
              application_date,
              status,
            }) => (
              <Row key={id}>
                <Cell>{name}</Cell>
                <Cell>{email}</Cell>
                <Cell>{birth_date}</Cell>
                <Cell>{year_of_experience}</Cell>
                <Cell>{position_applied}</Cell>
                <Cell>{application_date}</Cell>
                <CellStatus
                  accentColor={
                    status === 'rejected' ? 'var(--sunset-orange)' : status === 'waiting' ? 'var(--very-light-tangelo)' : 'var(--pastel-green)'
                  }
                >
                  {status}
                </CellStatus>
              </Row>
            ))
          }
        </tbody>
      </Table>
    </TableWrap>
  )
}

export default CandidatesTable
