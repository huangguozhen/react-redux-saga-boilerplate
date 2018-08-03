import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Close';
import MuiInput from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 15
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  formLabel: {
    fontSize: 14,
    width: 100,
    marginBottom: -10
  },
  formRoot: {
    marginBottom: 16
  },
  formInput: {
    textAlign: 'center'
  }
});

const Input = withStyles({
  input: {
    textAlign: 'center'
  }
})(MuiInput);

function rand () {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle () {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class Threshold extends Component {
  static defaultProps = {
    data: [],
    group: {}
  };

  state = {
    visible: false
  };

  handleOpen = () => {
    this.setState({ visible: true });
  }

  handleClose = () => {
    this.setState({ visible: false });
  }

  handleSave = () => {
    this.handleClose();
  }

  render () {
    const { classes, data, group } = this.props;

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
          onClick={this.handleOpen}
          className={classes.button}
          style={{ backgroundColor: '#00bf8b', color: '#fff' }}
        >设置范围</Button>
        <Modal
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          open={this.state.visible}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography
              variant='title'
              id='modal-title'
              style={{ textAlign: 'center' }}
            >
              设置阈值
            </Typography>
            <IconButton
              onClick={this.handleClose}
              aria-label='Close'
              classes={{ root: classes.close }}
            >
              <DeleteIcon />
            </IconButton>
            <div style={{ height: 1, backgroundColor: '#ccc', margin: '15px -14px 0' }} />
            <div style={{ padding: '20px 0 30px 30px' }}>
              <FormControlLabel
                control={
                  <div style={{ display: 'inline-flex', padding: '0 15px' }}>
                    <Input
                      inputRef={input => this.airTempMin = input}
                      style={{ width: 100 }}
                      placeholder='最小值'
                      defaultValue={group.airTempMin}
                    />
                    <span style={{ padding: '8px 10px 0' }}>-</span>
                    <Input
                      style={{ width: 100 }}
                      placeholder='最大值'
                      defaultValue={group.airTempMax}
                    />
                  </div>
                }
                label='空气温度(℃)'
                labelPlacement='start'
                classes={{ label: classes.formLabel, root: classes.formRoot }}
              />
              <FormControlLabel
                control={
                  <div style={{ display: 'inline-flex', padding: '0 15px' }}>
                    <Input
                      style={{ width: 100 }}
                      placeholder='最小值'
                      defaultValue={group.airHumiMin}
                    />
                    <span style={{ padding: '8px 10px 0' }}>-</span>
                    <Input
                      style={{ width: 100 }}
                      placeholder='最大值'
                      defaultValue={group.airHumiMax}
                    />
                  </div>
                }
                label='空气湿度(%)'
                labelPlacement='start'
                classes={{ label: classes.formLabel, root: classes.formRoot }}
              />
              <FormControlLabel
                control={
                  <div style={{ display: 'inline-flex', padding: '0 15px' }}>
                    <Input
                      style={{ width: 100 }}
                      placeholder='最小值'
                      defaultValue={group.solHumiMin}
                    />
                    <span style={{ padding: '8px 10px 0' }}>-</span>
                    <Input
                      style={{ width: 100 }}
                      placeholder='最大值'
                      defaultValue={group.solHumiMax}
                    />
                  </div>
                }
                label='土壤湿度(%)'
                labelPlacement='start'
                classes={{ label: classes.formLabel, root: classes.formRoot }}
              />
              <FormControlLabel
                control={
                  <div style={{ display: 'inline-flex', padding: '0 15px' }}>
                    <Input
                      style={{ width: 100 }}
                      placeholder='最小值'
                      defaultValue={group.illumMin}
                    />
                    <span style={{ padding: '8px 10px 0' }}>-</span>
                    <Input
                      style={{ width: 100 }}
                      placeholder='最大值'
                      defaultValue={group.illumMax}
                    />
                  </div>
                }
                label='光照强度(Lx)'
                labelPlacement='start'
                classes={{ label: classes.formLabel, root: classes.formRoot }}
              />
              <FormControlLabel
                control={
                  <div style={{ display: 'inline-flex', padding: '0 15px' }}>
                    <Input
                      style={{ width: 100 }}
                      placeholder='最小值'
                      defaultValue={group.co2Min}
                    />
                    <span style={{ padding: '8px 10px 0' }}>-</span>
                    <Input
                      style={{ width: 100 }}
                      placeholder='最大值'
                      defaultValue={group.co2Max}
                    />
                  </div>
                }
                label='CO₂浓度(ppm)'
                labelPlacement='start'
                classes={{ label: classes.formLabel, root: classes.formRoot }}
              />
              <div style={{ textAlign: 'center' }}>
                <Button
                  onClick={this.handleSave}
                  className={classes.button}
                  style={{
                    backgroundColor: '#00bf8b',
                    width: 200,
                    marginTop: 10,
                    color: '#fff'
                  }}
                >确认修改</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(Threshold);
