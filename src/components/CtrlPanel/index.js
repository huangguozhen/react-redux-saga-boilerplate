import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomizedSwitch from '../iOSSwitch';

const styles = theme => ({
  wrapper: {
    width: 260,
    minHeight: 424,
    height: 'calc(100vh - 560px)',
    float: 'left',
    padding: '10px 20px',
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  title: {
    padding: '10px 0 20px',
    color: '#00bf8b',
    fontSize: 16,
    fontWeight: 'bold'
  },
  label: {
    fontSize: 14,
    paddingRight: 20
  },
  formgroup: {
    paddingRight: 36
  }
});

class CtrlPanel extends Component {
  static defaultProps = {
    data: {}
  };

  render () {
    const { classes, onChange, data } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.title}>控制开关</div>
        <FormGroup classes={{ root: classes.formgroup }}>
          <FormControlLabel
            labelPlacement='start'
            classes={{
              label: classes.label
            }}
            label='浇水开关'
            control={(
              <CustomizedSwitch
                value='1'
                checked={!!data['1']}
                onChange={onChange}
              />
            )}
          />
          <FormControlLabel
            labelPlacement='start'
            classes={{
              label: classes.label
            }}
            label='通风开关'
            control={(
              <CustomizedSwitch
                value='2'
                checked={!!data['2']}
                onChange={onChange}
              />
            )}
          />
          <FormControlLabel
            labelPlacement='start'
            classes={{
              label: classes.label
            }}
            label='加热开关'
            control={(
              <CustomizedSwitch
                value='3'
                checked={!!data['3']}
                onChange={onChange}
              />
            )}
          />
          <FormControlLabel
            labelPlacement='start'
            classes={{
              label: classes.label
            }}
            label='补光开关'
            control={(
              <CustomizedSwitch
                value='4'
                checked={!!data['4']}
                onChange={onChange}
              />
            )}
          />
        </FormGroup>
      </div>
    );
  }
}

export default withStyles(styles)(CtrlPanel);
