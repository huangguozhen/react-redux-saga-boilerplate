import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../../assets/jss/components/headerStyle';

class Header extends Component {
  static defaultProps = {
    active: 'left'
  };

  getStyles = (tab) => ({
    backgroundColor: tab === this.props.active ? '#fff' : '#00bf8b',
    color: tab === this.props.active ? '#00bf8b' : '#fff'
  })

  render () {
    const { classes, onChangeTab } = this.props;
    return (
      <header className={classes.wrapper}>
        <div className={classes.title}>
          <span>智能农业监控系统</span>
        </div>
        <Button
          className={`${classes.button} ${classes.left}`}
          style={this.getStyles('left')}
          onClick={() => onChangeTab('left')}
        >
          节点信息
        </Button>
        <Button
          className={`${classes.button} ${classes.right}`}
          style={this.getStyles('right')}
          onClick={() => onChangeTab('right')}
        >
          视频监控
        </Button>
      </header>
    );
  }
}

export default withStyles(styles)(Header);
