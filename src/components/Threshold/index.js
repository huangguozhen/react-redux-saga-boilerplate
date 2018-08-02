import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  wrapper: {
    width: 260,
    float: 'left',
    padding: '10px 20px',
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  panel: {
    width: 125,
    height: 90,
    color: '#fff'
  },
  title: {
    padding: '10px 0 20px',
    color: '#00bf8b',
    fontSize: 16,
    fontWeight: 'bold'
  },
  button: {
    width: 100,
    minHeight: 30,
    fontSize: 14,
    padding: '2px 8px',
    marginTop: 10,
    marginBottom: 6
  },
  range: {
    fontSize: 20,
    paddingTop: 25,
    marginBottom: 6
  }
});

class Threshold extends Component {
  static defaultProps = {
    data: []
  };

  render () {
    const { classes, data } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.title}>正常范围值</div>
        <Grid container spacing={8}>
          {data.map((item, key) => (
            <Grid item xs={6} key={key}>
              <div
                className={classes.panel}
                style={{ backgroundImage: `url(${item.img})` }}
              >
                <div className={classes.range}>{item.min} - {item.max}</div>
                <div>{item.desc}</div>
              </div>
            </Grid>
          ))}
        </Grid>
        <Button
          className={classes.button}
          style={{ backgroundColor: '#00bf8b', color: '#fff' }}
        >设置范围</Button>
      </div>
    );
  }
}

export default withStyles(styles)(Threshold);
