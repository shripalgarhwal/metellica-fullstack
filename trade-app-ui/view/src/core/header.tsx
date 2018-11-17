import * as React from 'react';

import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import './header.css';

export interface ICompState {
    anchorEl: any,
    auth: boolean
}

class Header extends React.Component{
    public state: ICompState = {
        anchorEl: null,
        auth: true        
    };

    public handleChange = (event:any, checked:any) => {
        this.setState({ auth: checked });
    };

    public handleMenu = (event:any) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    public handleClose = () => {
        this.setState({ anchorEl: null });
    };
    public render () {
        // const { classes } = this.props;
        const { anchorEl, auth } = this.state;
        const open = anchorEl?true: false;
        return (
            <div className={'root'}>
                <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu"
                        className={'menuButton'}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={'flex'}>
                        Metallica App
                    </Typography>
                    <Button color="inherit">TRADES</Button>
                    <Button color="inherit">TRANSFERS</Button>
                    <Button color="inherit">TRANSPORTS</Button>
                    {auth && (
                    <div>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : ''}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit">
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                horizontal: 'right',
                                vertical: 'top'                                
                            }}
                            transformOrigin={{
                                horizontal: 'right',
                                vertical: 'top'
                            }}
                            open={open}
                            onClose={this.handleClose}>
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                    )}
                </Toolbar>
                </AppBar>
            </div>
        )
    }
}
/* 
// Header.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

//export default withStyles(styles)(Header);
 */
export default Header;
