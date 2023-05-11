import React, { useEffect, useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    console.log(isAdmin, "header");
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    console.log(movie);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  // const Search = styled('div')(({ theme }) => ({
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   // marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(1),
  //     width: 'auto',
  //   },
  // }));
  
  // const SearchIconWrapper = styled('div')(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }));

  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: 'inherit',
  //   '& .MuiInputBase-input': {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     // vertical padding + font size from searchIcon
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create('width'),
  //     width: '100%',
  //     // [theme.breakpoints.up('sm')]: {
  //     //   width: '16ch',
  //     //   '&:focus': {
  //     //     width: '20ch',
  //     //   },
  //     // },
  //   },
  // }));

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar sx={{bgcolor: "#2b2d42"}} position="sticky">
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
          <Box sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MovieIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              book_my_show
            </Typography>
            <Box sx={{display: "flex",  alignItems: "center", background: "#fff", border: "1px solid black", borderRadius: 1}} width={"450px"} marginLeft="10px">
                <Autocomplete
                  sx={{width: "100%", marginLeft: "5px"}}
                  onChange={handleChange}
                  freeSolo
                  options={movies && movies.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField
                      sx={{ input: { color: "#000", height: 30 } }}
                      variant="standard"
                      {...params}
                      placeholder="Search Acroos Multiple Movies"
                    />
                  )}
                />
                <SearchIcon sx={{ color: "#000" }} />
              </Box>
          </Box>
          <Box sx={{left: 0}}>
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <Box>
                <Button sx={{color: "#fff"}} href="/admin">Admin</Button>
                <Button sx={{color: "#fff"}} href="/auth">Auth</Button>
              </Box>
            )}
            {isUserLoggedIn && (
              <Box>
              <Button sx={{color: "#fff"}} href="/movies">Movies</Button>
              <Button sx={{color: "#fff"}} href="/user">Profile</Button>
              <Button sx={{color: "#fff"}} onClick={() => logout(false)} href="/">Logout</Button>
              </Box>
            )}
            {isAdminLoggedIn && (
              <Box>
              <Button sx={{color: "#fff"}} href="/add">Add Movie</Button>
              <Button sx={{color: "#fff"}} href="/movies">Movies</Button>
              <Button sx={{color: "#fff"}} href="/user-admin">Profile</Button>
              <Button sx={{color: "#fff"}} onClick={() => logout(true)} href="/">Logout</Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
