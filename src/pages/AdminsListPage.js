import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';

function mapStateToProps({ admins }) {
  return { admins };
}

@connect(mapStateToProps, { fetchAdmins })
class AdminsListPage extends Component {
  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    return this.props.admins.map(admin => <li key={admin.id}>{admin.name}</li>);
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

export default {
  component: AdminsListPage,
  loadData: ({ dispatch }) => dispatch(fetchAdmins())
};
