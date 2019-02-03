import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import BottomNavigation, {
  IconTab,
  FullTab,
  ShiftingTab,
  Badge
} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import { setBottomNavigation } from '../../redux/actions/actions_bottom_navigation'

class NavigationBase extends React.Component {
  state = {
    activeTab: 'portfolio'
  }

  tabs = [
    {
      key: 'portfolio',
      label: 'Portfolio',
      barColor: '#0e0d0d',
      pressColor: 'rgba(33,206,153, 0.16)',
      icon: 'insert-chart'
    },
    {
      key: 'search',
      label: 'Search',
      barColor: '#0e0d0d',
      pressColor: 'rgba(33,206,153, 0.16)',
      icon: 'search'
    },
    {
      key: 'account',
      label: 'Account',
      barColor: '#0e0d0d',
      pressColor: 'rgba(33,206,153, 0.16)',
      icon: 'account-circle'
    }
  ]

  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )

  renderTab = ({ tab, isActive }) => (
    <ShiftingTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )
  changeTab(key) {
    this.setState({
      activeTab: key
    })
    this.props.setBottomNavigation(key)
  }
  render() {
    const { loading,bottomnavigation } = this.props;

    return (
      !loading && <View>
        <BottomNavigation
          tabs={this.tabs}
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.changeTab(newTab.key)}
          renderTab={this.renderTab}
          useLayoutAnimation
        />
      </View>
    )
  }
}

function mapStateToProps({ bottomnavigation }) {
  return {
    bottomnavigation
  };
}

export default connect(mapStateToProps, {
  setBottomNavigation
})(NavigationBase);