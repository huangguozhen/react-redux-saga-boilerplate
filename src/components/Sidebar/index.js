import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import styles from '../../assets/jss/components/sidebarStyle';

class Sidebar extends Component {
  static defaultProps = {
    routes: []
  };

  render () {
    const { classes, routes, active, onChangeMenu } = this.props;
    return (
      <div className={classes.wrapper}>
        <List component='nav'>
          {routes.map((route, key) => (
            <ListItem
              button
              key={key}
              className={key === active ? classes.active : null}
              onClick={() => onChangeMenu(key)}
              style={{ textAlign: 'right' }}
            >
              <ListItemText primary={route.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
