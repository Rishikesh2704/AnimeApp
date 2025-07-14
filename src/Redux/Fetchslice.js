import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


export const Animeapi = createApi({
    reducerPath: "Animeapi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4444/api" }),
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        Home: builder.query({
            query: () => '/',
            transformResponse: (response) => response.results
        }),
        Animeinfo: builder.query({
            query: (animeid) => `/info?id=${animeid}`,
            transformResponse: (res) => res.results

        }),
        Eplist: builder.query({
            query: (animeid) => `/episodes/${animeid}`,
            transformResponse: (res) => res.results
        }),
        Animeservers: builder.query({
            query: (animeid) => `/servers/${animeid.animeid}?ep=${animeid.epid}`,
            transformResponse: (res) => res.results
        }),
        Animestream: builder.query({
            query: (animeid) => `/stream?id=${animeid.animeid}?ep=${animeid.epid}&server=${animeid.server}&type=${animeid.type}`,
            transformResponse: (res) => res.results,
            extraOptions: { maxRetries: 3 }
        }),
        Animesearch: builder.infiniteQuery({
            infiniteQueryOptions: {
                initialPageParam: 1,
                getNextPageParam: (last, allpage, lastPageParam) => lastPageParam+ 1
            },
            query({ queryArg, pageParam=1}) { return `/search?keyword=${queryArg}` },
            transformResponse: (res) => res.results
        }),
        GenreAnime: builder.infiniteQuery({
            infiniteQueryOptions: {
                initialPageParam: 1,
                getNextPageParam: (last, allpage, lastPageParam) => lastPageParam + 1
            },
            query(queryArg) { return `/genre/${queryArg.queryArg.currgen}?page=${queryArg.pageParam}` },
            transformResponse: (res) => res.results
        })

    })
})


export const {
    useHomeQuery,
    useAnimeinfoQuery,
    useEplistQuery,
    useAnimeserversQuery,
    useAnimestreamQuery,
    useAnimesearchInfiniteQuery,
    useGenreAnimeInfiniteQuery,
} = Animeapi