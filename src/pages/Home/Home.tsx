import React, { FC } from 'react'
import styled from 'styled-components'

import ErrorInline from '../../components/ErrorInline'
import PageHeader from './PageHeader'
import CandidatesTable from './CandidatesTable'
import { useHome } from './shared/hooks'

const Wrap = styled.div`
  height: 100%;
`

const Home: FC = () => {
  const {
    isNoCandidatesFound,
    urlParams,
    positions,
    candidatesFiltered,
    statuses,
    onSortToggle,
  } = useHome()

  return (
    <Wrap>
      <PageHeader urlParams={urlParams} positions={positions} statuses={statuses} />
      <ErrorInline
        isInfoVariant={isNoCandidatesFound}
        infoMessage="No applicants found"
      />
      {!isNoCandidatesFound && (
        <CandidatesTable urlParams={urlParams} candidatesFiltered={candidatesFiltered} onSortToggle={onSortToggle} />
      )}
    </Wrap>
  )
}

export default Home
