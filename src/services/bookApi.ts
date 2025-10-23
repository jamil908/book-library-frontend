

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../types/api.types";
import type { IBook, ICreateBook, IUpdateBook } from "../types/book.types";
import type { IBorrow, IBorrowSummary, ICreateBorrow } from "../types/borrow.types";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Books", "Borrow"],
  endpoints: (builder) => ({
    // 📚 Get all books
    getBooks: builder.query<ApiResponse<IBook[]>, void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),

    // 📘 Get single book by ID
    getBookById: builder.query<ApiResponse<IBook>, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Books", id }],
    }),

    // ➕ Add a new book
    createBook: builder.mutation<ApiResponse<IBook>, ICreateBook>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    // ✏️ Update book
    updateBook: builder.mutation<ApiResponse<IBook>, IUpdateBook>({
      query: ({ id, ...update }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: update,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Books",
        { type: "Books", id },
      ],
    }),

    // ❌ Delete book
    deleteBook: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    // 📖 Borrow a book
    borrowBook: builder.mutation<ApiResponse<IBorrow>, ICreateBorrow>({
      query: ({ bookId, ...borrow }) => ({
        url: `/borrow/${bookId}`,
        method: "POST",
        body: borrow,
      }),
      invalidatesTags: ["Borrow", "Books"],
    }),

    // 📊 Borrow summary
    getBorrowSummary: builder.query<ApiResponse<IBorrowSummary[]>, void>({
      query: () => "/borrow/summary",
      providesTags: ["Borrow"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = bookApi;

