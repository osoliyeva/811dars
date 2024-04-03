import { Avatar, Badge, Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { Person } from "@mui/icons-material";
import styled from "@emotion/styled";


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));




const ChatItem = ({onClick, user}:any) => {
    return (
        <>
        <ListItem onClick={onClick} sx={{cursor:"pointer"}}>
                <ListItemAvatar>
           <StyledBadge badgeContent={2} overlap="circular" color="primary" anchorOrigin={{horizontal:"right", vertical:"bottom"}}>         
                <Avatar src="https://randomuser.me/api/portraits/women/49.jpg">
                    <Person />
                </Avatar>
            </StyledBadge>
        </ListItemAvatar>
        <ListItemText primary={user} secondary="Jan 9, 2014" />
         </ListItem>
        <Divider></Divider>
    </>
    )
}


export default ChatItem