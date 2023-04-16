import styled from "styled-components";
import Button from "../components/Button"
import { useState } from "react";

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

interface FormValues {
  username: string;
  email: string;
  password: string;
}

// T 是使用 builtin 的type 定义 string -> string 的map
interface UserFormProps {
  formType: 'signUp' | 'signIn'
  // ({ variables: { ...values } })
  action: (values: { variables: FormValues }) => void
}

const UserForm = ({ formType, action }: UserFormProps) => {
  const [values, setValues] = useState<FormValues>({
    username: '',
    email: '',
    password: '',
  })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <Wrapper>
      <h2>{formType === 'signUp' ? 'Sign Up' : 'Sign In'}</h2>
      <Form
        onSubmit={(event) => {
          event.preventDefault()
          action({ variables: { ...values } })
        }}
      >
        {formType === 'signUp' && (
          <>
            <label htmlFor="username">Username:</label>
            <input
              required
              type="text"
              id="username"
              name="username"
              placeholder="username"
              onChange={onChange}
            />
          </>
        )}
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" placeholder="email"
          value={values.email} onChange={onChange}
        />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" placeholder="Password"
          value={values.password} onChange={onChange}
        />
        <Button type="submit">Sign Up</Button>
      </Form>
    </Wrapper>
  )

}

export default UserForm