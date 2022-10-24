import { AppBar, Avatar, createTheme, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from '../axios';
import UploadAndDisplayImage from './UploadAndSelectimage';
import { UserContext } from '../Context/Context';
import { useContext } from 'react';
import { baseUrl } from '../url';
import { useNavigate } from 'react-router-dom';
import ProfilePage from '../components/ProfilePage'
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1200,
            xl: 1536,
        },
    },
});

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const StyledTypography = styled(Typography)({
    [theme.breakpoints.up('md')]: {
        display: "block"
    },
    [theme.breakpoints.down('md')]: {
        display: "none"
    },
})



function Admin_header({ user, socket }) {
    const { imageURL } = useContext(UserContext)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState(false)
    const { image, setImage } = useContext(UserContext)
    const Logout = () => {
        setOpen(false)
        axios.get(`${baseUrl}/logout`, { withCredentials: true }).then((response) => {
            if (response.data.logoutGranted) {
                navigate('/')
            }
        })
    }

    const handelprofile = () => {
        setOpen(false)
        setProfile(true)
    }

    const handleClose = () => {
        setProfile(false)
    }





    return (
        <AppBar position="sticky">
            <StyledToolbar variant="dense" >
                <Box >
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, gap: 1 }}>
                        <ForumOutlinedIcon />
                        <StyledTypography variant="h6">
                            CHIT-CHAT
                        </StyledTypography>
                    </IconButton>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    <StyledTypography variant="h9"  >
                        {user ? user : 'account'}
                    </StyledTypography>
                    <Avatar onClick={e => {
                        setOpen(false)
                        setImage(true)
                    }} alt="img" src={baseUrl + '/' + imageURL} />
                    <IconButton onClick={e => setOpen(true)}>
                        <MoreVertIcon />
                    </IconButton>
                </Box>

                {/* main menu */}
                <Menu
                    sx={{
                        mt: '45px',
                        [theme.breakpoints.up('sm')]: {
                            ml: "-60%"
                        },

                        [theme.breakpoints.down('sm')]: {
                            ml: "none"
                        },
                    }}
                    id="menu-appbar"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={e => setOpen(false)}
                >
                    <MenuItem onClick={handelprofile}>
                        <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={Logout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>

                {/* profile image upload menu */}
                <Menu
                    sx={{
                        mt: '45px',
                        [theme.breakpoints.up('sm')]: {
                            ml: "-60%"
                        },

                        [theme.breakpoints.down('sm')]: {
                            ml: "none"
                        },
                    }}
                    id="menu-appbar"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={image}
                    onClose={e => setImage(false)}
                >
                    <MenuItem display='flex'>
                        <UploadAndDisplayImage />
                    </MenuItem>
                </Menu>


                {/* profile page using menu */}
                <Menu
                    sx={{
                        mt: '45px',
                        [theme.breakpoints.up('sm')]: {
                            ml: "-60%"
                        },

                        [theme.breakpoints.down('sm')]: {
                            ml: "none"
                        },
                    }}
                    id="menu-appbar"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={profile}
                    onClose={e => setProfile(false)}
                >
                    <CloseIcon sx={{ ml: '90%', mt: '1rem', color: "primary" }} onClick={handleClose}></CloseIcon>
                    <ProfilePage user={user}/>

                </Menu>

            </StyledToolbar>
        </AppBar>
    )
}

export default Admin_header
