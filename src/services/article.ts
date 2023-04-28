import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const articleApi: any = createApi({
    reducerPath: "articleApi",
 
    baseQuery: fetchBaseQuery({  
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers:any) => { 
            headers.set('X-RapidAPI-Key', process.env.RAPID_API_KEY),
                headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com')
            return headers  
        }
    }),

    endpoints: (builder) => ({
        getSummary: builder.query<any, string>({
            query: (params:any) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        }),
    }),
}) 
export const {useLazyGetSummaryQuery} = articleApi