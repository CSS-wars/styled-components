import { History, LocationState } from "history";

import { homePath } from '../../../Application/paths'
import { UrlParams } from '../../../shared'
import { ColumnIds, SortDirections } from "./enums";

export function getUrlParams(urlSearch: string): UrlParams {
  const urlSearchParams = new URLSearchParams(urlSearch)

  return {
    sortedColumnId: urlSearchParams.get('sortedColumnId'),
    sortDirection: urlSearchParams.get('sortDirection'),
    searchQuery: urlSearchParams.get('searchQuery'),
    position: urlSearchParams.get('position'),
    status: urlSearchParams.get('status'),
  }
}

export function updateUrl({ urlParams, history }: { urlParams: UrlParams; history: History<LocationState> }): void {
  const { location: { search } } = history
  const urlSearchParams = new URLSearchParams(search)
  
  Object.keys(urlParams).map((key) => {
    const updatedParam = (urlParams[key] === undefined) || (urlParams[key] === null) ? '' : urlParams[key]
    urlSearchParams.set(key, updatedParam)
  })

  history.push({
    pathname: homePath(),
    search: urlSearchParams.toString()
  })
}

export const sortByColumnId = (columnId: string = ColumnIds.name, sortDirection: string = SortDirections.asc) => {
  interface Compare { [columnId: string]: string }
  const isAsc = sortDirection === SortDirections.asc

  return ((a: Compare, b: Compare): number => {
    if (a[columnId] > b[columnId]) return isAsc ? 1 : -1
    else if (a[columnId] < b[columnId]) return isAsc ? -1 : 1
    return 0
  })
}

const stringEscaped = (str: string):string => (str || '').replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
const generateRegex = (input: string): RegExp => new RegExp(stringEscaped(input), 'gi')

export const filterBySearchQuery = (searchText: string) =>
  (item: { name: string }): boolean =>
    generateRegex(searchText).test(item.name)

export const filterByPosition = (position: string) =>
  (item: { [ColumnIds.position]: string }): boolean =>
    !position || item[ColumnIds.position] === position

export const filterByStatus = (status: string) =>
  (item: { [ColumnIds.status]: string }): boolean =>
    !status || item[ColumnIds.status] === status
