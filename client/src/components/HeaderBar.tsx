import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import useLoggedInUser from "../zustand/zustand.ts"

const HeaderBar = () => {
  const user = useLoggedInUser((state) => state.user)
  const removeUser = useLoggedInUser((state) => state.removeUser)
  return (
    <Box sx={{/* width: '100vw',*/ flexGrow: 1 }} >
      <AppBar >
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} variant="h6" >
            Welcome, {user ? user.name : "User"}
          </Typography>
          <Button onClick={removeUser} sx={{ color: 'white' }} >Logout</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  )
}

export default HeaderBar