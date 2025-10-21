import { Button } from "@mui/material"
import { styled } from "@mui/material/styles";


export const GreyButton = styled(Button)(() => ({
    backgroundColor: 'grey',
    color: 'white',
    borderColor: 'black',
    borderWidth: '2px',
    '&:hover': { backgroundColor: 'darkgrey' }
}))