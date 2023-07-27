import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ShortLaunchWithRocket} from '../types/launches.types';
import {FilterQuery} from 'mongoose';
import {Sort} from '../pages/LaunchesPage/LaunchesPage';

interface Query<T> {
  query: FilterQuery<T>;
  sort: Sort;
}

export interface PaginateResult<T> {
  docs: T[];
  totalDocs: number;
  offset: number | undefined;
  limit: number;
  totalPages: number;
  page: number;
  nextPage?: number | null | undefined;
  prevPage?: number | null | undefined;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export const launchesApi = createApi({
  reducerPath: 'launchesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spacexdata.com/v5/launches/',
  }),
  endpoints: (builder) => ({
    getLaunchesWithRocket: builder.query<PaginateResult<ShortLaunchWithRocket>,Query<ShortLaunchWithRocket>>({
      query: ({query, sort}) => ({
        url: `query/`,
        method: 'POST',
        body: {
          query,
          options: {
            sort: {date_utc: sort},
            select: ['id', 'name', 'rocket', 'details', 'date_utc'],
            populate: {
              path: 'rocket',
              select: ['name', 'flickr_images'],
            },
          },
        },
      }),
    }),
  }),
});

export const {useGetLaunchesWithRocketQuery} = launchesApi;
