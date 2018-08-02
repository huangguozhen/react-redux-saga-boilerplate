const sidebarStyle = theme => ({
  wrapper: {
    float: 'left',
    position: 'relative',
    height: 'calc(100vh - 100px)',
    overflow: 'auto',
    width: '150px',
    zIndex: '4',
    backgroundColor: '#fff',
    overflowScrolling: 'touch'
  },
  active: {
    borderLeft: '4px solid #00bf8b',
    backgroundColor: 'rgba(0,0,0, .08)'
  }
});

export default sidebarStyle;
