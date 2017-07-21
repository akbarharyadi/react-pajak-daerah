import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';
import { Header, Title, Container, Content, Left, Body, Right, List, ListItem, Text, Icon } from 'native-base'; 

export default class Setting extends Component {
    renderHeader(){
      const{title} = this.props
      return(
          <Header>
            <Body>
                <Title>
                    {title}
                </Title>
            </Body>
          </Header>
      )
    }  

    render() {
        return (
            <Container>
                {this.renderHeader()}
                <Content>
                    <Text style={{fontSize: 20,
                        textAlign: 'center',
                        margin: 10}}>
                        Test APP ver 1.0
                    </Text>
                </Content>
            </Container>
        );
    }
}