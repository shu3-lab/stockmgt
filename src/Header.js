import React from 'react'
import { css } from 'glamor'
import { Link } from 'react-router-dom'
import UserContext from './UserContext'
import {AppBar, Drawer, MenuItem, Toolbar, IconMenu} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    console.log('Handle Toggle')
    this.setState({open: !this.state.open}) 
  }
  
  static contextType = UserContext
  render() {
    const isAuthenticated = this.context.user && this.context.user.username ? true : false
    const isLoaded = this.context.isLoaded
    return (
         <MuiThemeProvider>
          <div {...css(styles.container)}>
            <Drawer
              open={this.state.open}
              docked={false}
              width={200}
              onRequestChange={this.handleToggle}
             >
             <MenuItem>
                <Link to='/item' {...css(styles.link)}>
                  <p {...css(styles.sideNavItem)}>Items Registration</p>
                </Link>
             </MenuItem>
             </Drawer>
             <AppBar 
                     onLeftIconButtonClick={this.handleToggle}>
              <img
                style={styles.amplifyLogo}
                src={require('./assets/amplifywhite.png')}
              />
              <Link to='/' {...css(styles.link)}>
                <h2 {...css(styles.title)}>Home Stock Management</h2>
              </Link>
              <div {...css(styles.navContainer)}>
              <Link to='/' {...css(styles.link)}>
                <p {...css(styles.navItem)}>Home</p>
              </Link>
                <Link to='/private' {...css(styles.link)}>
                  <p {...css(styles.navItem)}>Private</p>
                </Link>
                {
                  isLoaded ? isAuthenticated ? (
                    <Link to='/profile' {...css(styles.link)}>
                      <p {...css(styles.navItem)}>Profile</p>
                    </Link>
                  ) : (
                    <Link to='/auth' {...css(styles.link)}>
                      <p {...css(styles.navItem)}>Sign In</p>
                    </Link>
                  ) : null
                }
              </div>
             </AppBar>
          </div>
        </MuiThemeProvider>
      
    )
  }
}

const styles = {
  amplifyLogo: {
    height: 30,
    marginLeft: 25
  },
  title: {
    fontWeight: 300,
    color: 'white',
    margin: 0,
    textAlign: 'left',
    marginLeft: 10,
  },
  navContainer: {
    display: 'flex',
    flex: 1,
    paddingLeft: 50
  },
  link: {
    textDecoration: 'none',
  },
  navItem: {
    marginLeft: 20,
    color: 'white',
    paddingBottom: '4px',
    borderBottom: '2px solid transparent',
    ':hover': {
      borderBottom: '2px solid white'
    }
  },
  sideNavItem: {
    color: 'black',
    paddingBottom: '4px',
    borderBottom: '2px solid transparent',
  },
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  container: {
    display: 'flex'
  }
}

export default Header
