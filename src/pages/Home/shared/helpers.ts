import { History, LocationState } from "history";

import { homePath } from '../../../Application/paths'
import { UrlParams } from '../../../constants'
import { COLUMN_ID_NAME, SORT_ASC, COLUMN_ID_STATUS, COLUMN_ID_POSITION } from "./constants";

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

export const sortByColumnId = (columnId: string = COLUMN_ID_NAME, sortDirection: string = SORT_ASC) => {
  interface Compare { [columnId: string]: string }
  const isAsc = sortDirection === SORT_ASC

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
  (item: { [COLUMN_ID_POSITION]: string }): boolean =>
    !position || item[COLUMN_ID_POSITION] === position

export const filterByStatus = (status: string) =>
  (item: { [COLUMN_ID_STATUS]: string }): boolean =>
    !status || item[COLUMN_ID_STATUS] === status
