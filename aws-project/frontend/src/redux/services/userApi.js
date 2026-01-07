import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/users", // backend URL
  }),

  tagTypes: ["Users"],

  endpoints: (builder) => ({



    getUsers: builder.query({
      
      query: () => "/get",
      providesTags: ["Users"],
    
    }),

    // Create user
    createUser: builder.mutation({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData, // FormData (image + fields)
      }),
      invalidatesTags: ["Users"],
    }),

    // UPDATE USER
    updateUser: builder.mutation({
      query: ({ user_id, formData }) => ({
        url: `/update/${user_id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Users"],
    }),

    // DELETE USER
    deleteUser: builder.mutation({
      query: (user_id) => ({
        url: `/delete/${user_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;