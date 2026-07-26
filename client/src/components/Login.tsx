import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import loginServiceClient from "../services/loginServiceClient"
import useLoggedInUser from "../zustand/zustand"

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const setUser = useLoggedInUser((state) => state.setUser)

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const loginResponse = await loginServiceClient.login({
        username: username,
        password: password
      })

      setUser(loginResponse)
    } catch (err) {
      if (err instanceof Error) {
        console.log("Login error: ", err.message)
      } else {
        console.log("Unknown Login error: ", err)
      }
    }
  }

  return (
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}} >
        <Typography variant="h2" sx={{ marginBottom: '30px', color: 'grey' }} >Login</Typography>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '500px' }}>
          <TextField
            label="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            label="Password"
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button type="submit" sx={{ maxWidth: '60%', margin: 'auto' }}>Login</Button>
        </form>
      </Box>
  )
}

export default Login