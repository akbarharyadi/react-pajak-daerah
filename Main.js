import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions, Scene, Router, Switch, Modal } from 'react-native-router-flux';
import { Icon } from 'native-base';

import Home from './scenes/Home';
import Setting from './scenes/Setting';
import FormHotel from './scenes/FormHotel';

class TabIcon extends Component {
    render(){
        const title = this.props.title;
        let icon = '';
        if(title == "Home"){
            icon = "home";
        } else if (title == "Setting"){
            icon = "settings";
        }
        return (
            <Icon name={icon} style={{color: this.props.selected ? '#857ce4' : '#afafa4'}} />
        );
    }
}

class Main extends Component {
    componentWillMount(){
        this.scenes = Actions.create(
            <Scene key="root" >
                <Scene key="menus">
                    <Scene key="tabbar" tabs={true} tabBarStyle={{backgroundColor:'#f7f7f7'}}>
                        <Scene key="Home" component={Home} title="Home" icon={TabIcon} hideNavBar={true} />
                        <Scene key="Setting" component={Setting} title="Setting" icon={TabIcon} hideNavBar={true} />
                    </Scene>
                    <Scene key="FormHotel" component={FormHotel} title="Rekam Pajak Hotel" hideNavBar={true} />
                </Scene>
            </Scene>
        );
    }
    render(){
        return <Router scenes={this.scenes} />
    }
}

module.exports = Main;