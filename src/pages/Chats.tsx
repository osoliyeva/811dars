import { Box, Grid, IconButton, List, Paper, Stack, TextField, Typography } from "@mui/material"
import ChatItem from "../components/ChatItem"
import { ArrowBackIosSharp, Send } from "@mui/icons-material"
import Message from "./Message"
import { onValue, ref, set } from "firebase/database"
import { auth, realDB } from "../firebase"
import { useEffect, useState } from "react"
import {v4 as uuid} from 'uuid'




const Chats = () => {

    const [users, setUsers] = useState<any[]>([])
    const [activeUser, setActiveUser] = useState<string>("")
    const [messages, setMessages] = useState<any>([])
    const [text,setText]=useState<string>("")

    useEffect(() => {
        const usersRef = ref(realDB, "users/");

        onValue(usersRef, snap => {
            setUsers(Object.keys(snap.val()));
            
        })
    }, [])
    
    const handleChat = (user:any) => {
        setActiveUser(user)
        const actualUser = auth.currentUser?.email?.slice(0, -10)
        let chat;
        if (actualUser!>user) {
            chat=actualUser+user
        } else {
            chat=user+actualUser
        }
        const chatRef=ref(realDB,   `chats/${chat}`)
        onValue(chatRef, (snap) => {
            const data = snap.val()
            setMessages(Object.values(data))
        })
    }
  

    console.log(messages);
    
    const sendMessage = () => {
        
        const actualUser = auth.currentUser?.email?.slice(0, -10)
        let chat;
        if (actualUser!>activeUser) {
            chat=actualUser+activeUser
        } else {
            chat=activeUser+actualUser
        }
        const chatRef = ref(realDB, `chats/${chat}/${uuid()}`)
        set(chatRef,  {
            from: actualUser,
            text,    
        })
        setText("")
       
    }
    return (
        <Grid container sx={{height:"100vh"}} >
            <Grid item sm={4}>
                <List sx={{}}>
                    {users.map(user=><ChatItem key={user} user={user} onClick={handleChat(user)}  />)}
                    
                </List>
                
            </Grid>
            
            <Grid sm={8} >
                <Paper sx={{height:"100vh", display:"flex", flexDirection:"column"}} >
                    {/* chat header */}
                    <Paper >
                        <Box>
                            <Paper sx={{ p: 2 }}>
                                <Box display={"flex"} alignItems={"center"} gap={1}>
                                    <IconButton sx={{display:{sm:"none"}}}>
                                        <ArrowBackIosSharp color="primary" />
                                    </IconButton>
                                    <Typography>
                                        {activeUser}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                    </Paper>

                
                    <Paper sx={{ height: "100vh", display: "flex", alignItems: "flex-end", flexDirection: "column", justifyContent:"start"}}  >
                        <Stack justifyContent={"flex-end"} spacing={2} sx={{ p: 2, flex: 1 }}>
                            {messages.map((message: any, index: number) => {
                                <Message 
                                    key={index}
                                    text={message.text}
                                    right={auth.currentUser?.email?.slice(0, -10)==message.from}/>
                            })}
                            
                        </Stack>
                        <Box display={"flex"} m={2} sx={{ width: "90%" }} >
                            <TextField
                                fullWidth
                                label="message..."
                                variant="outlined"
                                placeholder="message..."
                                size="small"
                                value={text}
                                onChange={(e)=>setText(e.target.value)}
                            />
                            <IconButton color="primary" onClick={sendMessage} >
                                <Send/>
                            </IconButton>
                        </Box>
                    </Paper>
                </Paper>
            </Grid>
        </Grid>
    )
}


export default Chats