import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';

function mapStateToProps({ admins }) {
  return { admins };
}

@connect(mapStateToProps, { fetchAdmins })
class AdminsListPage extends Component {
  static propTypes = {
    fetchAdmins: PropTypes.func,
    admins: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }))
  };

  static defaultProps = {
    fetchAdmins: () => {},
    admins: []
  };

  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    const { admins } = this.props;
    return admins.map(admin => <li key={admin.id}>{admin.name}</li>);
  }

  render() {
    // console.log('--a: ', a);
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
