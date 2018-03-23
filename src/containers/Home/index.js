import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import 'react-select/dist/react-select.css';
import Snackbar from 'material-ui/Snackbar';
import { CircularProgress } from 'material-ui/Progress';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import CenterBlock from 'components/CenterBlock';
import withRoot from 'withRoot';
import { TrackAPI } from 'api/TrackAPI';
import Modal from 'material-ui/Modal';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});


class Home extends React.Component {
  state = {
    users: [],
    tracks: [],
    openNotification: false,
    open: false,
    message: '',
    loading: new Set(),
  };

  componentWillMount() {
    this.addLoading('users');
    this.fetchUsers();
  }

  handleRequestClose = () => {
    this.setState({
      openNotification: false,
    });
  };


  handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  fetchUsers = () => {
    TrackAPI.findUsers().then(({ data }) => {
      this.setState({ users: data });
      this.removeLoading('users');
    }).catch((err) => {
      this.showNotification(`Couldn't find users! (${err.message}) `);
      this.removeLoading('users');
    });
  }

  showNotification = (message) => {
    this.setState({
      openNotification: true,
      message,
    });
  }

  removeLoading = (...components) => {
    const { loading } = this.state;
    components.forEach((component) => {
      loading.delete(component);
    });
    this.setState(loading);
  }

  addLoading = (...components) => {
    const { loading } = this.state;
    components.forEach((component) => {
      loading.add(component);
    });
    this.setState(loading);
  }

  handleRowClick = (event, email) => {
    this.setState({ open: true });
    this.addLoading('tracks');
    TrackAPI.findTracksByUser(email).then(({ data }) => {
      const tracks = data.map(track => ({
        id: track.id,
        uri: track.uri,
        date: new Date(track.date).toLocaleString('pt-br'),
      }));
      this.setState({ tracks });
      this.removeLoading('tracks');
    }).catch((err) => {
      this.showNotification(`Couldn't find tracks! (${err.message}) `);
      this.removeLoading('tracks');
    });
  }

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      openNotification, message,
      users,
      loading,
      tracks,
    } = this.state;

    const {
      classes,
    } = this.props;

    return (
      <div>
        <div className="container">
          <div className="row">
            <CenterBlock className="col-xs-12 col-md-6">
              <form className="form-horizontal">
                <div className="form-group">
                  <Typography variant="display1" noWrap gutterBottom>
                          Contacts
                  </Typography>
                </div>
              </form>
            </CenterBlock>
          </div>
          { loading.has('users') ?
            <div className="row justify-content-center">
              <CircularProgress size={30} />
            </div> :
            <div>
              <hr />
              <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                    users.map(row => (
                      <TableRow
                        key={row.id}
                        hover
                        onClick={event => this.handleRowClick(event, row.email)}
                      >
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                      </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Paper>
            </div>

          }
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleCloseModal}
          >
            <div style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} className={classes.paper}>
              <Typography variant="title" id="modal-title">
                Tracks
              </Typography>
              { loading.has('tracks') ?
                <div className="row justify-content-center">
                  <CircularProgress size={30} />
                </div> :
                <div>
                  <hr />
                  <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>URI</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          tracks.map(row => (
                            <TableRow
                              key={row.id}
                            >
                              <TableCell>{row.uri}</TableCell>
                              <TableCell>{row.date}</TableCell>
                            </TableRow>
                      ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              }
            </div>
          </Modal>
        </div>


        <Snackbar
          open={openNotification}
          message={message}
          autoHideDuration={4000}
          onClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Home));
