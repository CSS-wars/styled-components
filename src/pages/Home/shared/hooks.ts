import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  filterBySearchQuery,
  filterByPosition,
  filterByStatus,
  sortByColumnId,
  updateUrl,
  getUrlParams,
} from './helpers'
import {
  ColumnIds, SortDirections
} from './enums'
import candidatesData from '../../../api/candidatesData.json'

export const useHome = () => {
  const [candidates, setCandidates] = useState([])
  const [positions, setPositions] = useState([])
  const [statuses, setStatuses] = useState([])
  const history = useHistory()
  const { location: { search } } = history
  const urlParams = getUrlParams(search)
  const { sortedColumnId, sortDirection, status, position, searchQuery } = urlParams

  useEffect(() => {
    updateUrl({
      urlParams: { ...urlParams, sortedColumnId, sortDirection },
      history,
    })
    getData()
  }, [])

  function getData() {
    const { data } = candidatesData
    const responseSorted = data.sort(sortByColumnId(sortedColumnId, sortDirection))
    setCandidates(responseSorted)
    setPositions([...new Set(data.map((x: { [ColumnIds.position]: string }) => x[ColumnIds.position]))])
    setStatuses([...new Set(data.map((x: { [ColumnIds.status]: string }) => x[ColumnIds.status]))])
  }

  function onSortToggle(columnIdSelected: string) {
    const { sortedColumnId, sortDirection } = urlParams
    const determineSort = ((sodtDirection: string, flip?: boolean): string => (
      sortDirection === SortDirections.asc && flip ? SortDirections.desc : SortDirections.asc
    ))
    const newSortDirection = columnIdSelected === sortedColumnId
      ? determineSort(sortDirection, true)
      : determineSort(sortDirection)
    setCandidates([...candidates.sort(sortByColumnId(columnIdSelected, newSortDirection))])
    updateUrl({ urlParams: { ...urlParams, sortedColumnId: columnIdSelected, sortDirection: newSortDirection }, history })
  }
  
  const candidatesFiltered = candidates
    .filter(filterBySearchQuery(searchQuery))
    .filter(filterByPosition(position))
    .filter(filterByStatus(status))
  const isNoCandidatesFound = !candidatesFiltered.length

  return {
    urlParams,
    positions,
    statuses,
    candidatesFiltered,
    isNoCandidatesFound,
    getData,
    onSortToggle,
  }
}
