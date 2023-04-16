import { useEffect, useState } from "react"

import styled from "styled-components";
import { useMutation, useApolloClient, gql } from "@apollo/client"
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

// interface FormValues {
//   username: string;
//   email: string;
//   password: string;
// }

const SignUp = () => {
  const navigate = useNavigate()

  // set the page title
  useEffect(() => {
    document.title = 'Sign Up - Notedly'
  })

  const client = useApolloClient()

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      // store the token
      localStorage.setItem('token', data.signUp)

      // set the local cache
      client.writeQuery({
        query: gql`
          query GetLoggedInUser {
            isLoggedIn @client
          }
        `,
        data: {
          isLoggedIn: true
        }
      });

      // 重定向
      navigate('/')
    }
  })

  return (
    <>
      <UserForm
        formType="signUp"
        action={signUp}
      ></UserForm>
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </>
  )
}

export default SignUp