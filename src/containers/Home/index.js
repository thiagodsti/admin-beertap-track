import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import CenterBlock from 'components/CenterBlock';
import withRoot from 'withRoot';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <CenterBlock className="col-xs-12 col-md-6">
              <div className="form-group">
                <Typography variant="display1" noWrap gutterBottom>
                          Contacts
                </Typography>
              </div>

            </CenterBlock>
          </div>
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Home));
