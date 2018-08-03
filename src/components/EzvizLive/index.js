import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

class EZUILive extends Component {
  componentDidMount () {
    /* eslint no-undef: 0 */
    /* eslint no-unused-vars: 0 */
    this.player = new EZUIPlayer('ezuiPlayer');
  }

  componentWillUnmount () {
    if (this.player) {
      delete this.player;
    }
  }

  render () {
    return (
      <video
        id="ezuiPlayer"
        controls
        playsInline
        webkit-playsinline="true"
        autoPlay
        poster=""
        {...this.props} >
        <source
          src="rtmp://rtmp.open.ys7.com/openlive/e8b3281634c0478cbd2da5a492611ff3.hd"
          type="" />
        <source
          src="http://hls.open.ys7.com/openlive/e8b3281634c0478cbd2da5a492611ff3.hd.m3u8"
          type="application/x-mpegURL" />
      </video>
    );
  }
}

export default EZUILive;
