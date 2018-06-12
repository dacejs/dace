import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';
import asyncConnect from '../helpers/asyncConnect';

function mapStateToProps({ admins }) {
  return { admins };
}

@asyncConnect(dispatch => dispatch(fetchAdmins()))
@connect(mapStateToProps, { fetchAdmins })
export default class AdminsListPage extends Component {
  static propTypes = {
    admins: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }))
  };

  static defaultProps = {
    admins: []
  };

  renderAdmins() {
    const { admins } = this.props;
    return admins.map(admin => <li key={admin.id}>{admin.name}</li>);
  }

  render() {
    return (
      <div>
        <h3>Protected list of admins</h3>
        <ul>{this.renderAdmins()}</ul>
      </div>
    );
  }
}
