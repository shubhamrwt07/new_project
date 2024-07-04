import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { profile_img } from '../assets/image';
import 'animate.css';
import '../style/Navbar.css';
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [activeLink, setActiveLink] = useState('');
  const count = useSelector(state => state.count.count);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/', { replace: true });
    setAnchorElUser(null);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const accountGoing = () => {
    navigate('/account');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top">
      <div className="container mt-lg-4 bg-white rounded p-lg-3 shadow-sm">
        <Link className="navbar-brand animate__animated animate__bounce" to="#">
          TORETO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                aria-current="page"
                to="/home"
                onClick={() => handleLinkClick('home')}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === 'dashboard' ? 'active' : ''}`}
                aria-current="page"
                to="/dashboard"
                onClick={() => handleLinkClick('dashboard')}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === 'product' ? 'active' : ''}`}
                aria-current="page"
                to="/product"
                onClick={() => handleLinkClick('product')}
              >
                Product
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Open account">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={profile_img} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      if (setting === 'Logout') {
                        handleLogout();
                      } else if (setting === 'Account') {
                        accountGoing();
                      } else {
                        handleCloseUserMenu();
                      }
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Link className='text-secondary nav-link' to='/cart'>
              <FaCartShopping />
              <span style={{ fontSize: '14px' }}>{count}</span>
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
