import { Paper, Stack } from "@mui/material"



const Message = ({right, text}:{right?:boolean, text:string}) => {
    return (
       <Stack  display={"flex"} justifyContent={right?"flex-end":"start"}>
            <Paper sx={{py:1, px:2, bgcolor:right?"primary.main":"",color:right?"#fff":"#000"}}>
                {text}
            </Paper>
        </Stack>
    )
}

export default Message