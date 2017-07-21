import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { Header, Title, Container, Content, Left, Body, Right, List, ListItem, Text, Icon } from 'native-base'; 
import Hr from 'react-native-hr';
import { Actions } from 'react-native-router-flux';

export default class Home extends Component {
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
                <Content>
                    <Image
                        style={{width: 350, height: 60, margin: 8}}
                        source={require('../img/logo-e-sptpd.png')}
                    />
                    <Hr marginLeft={50} lineColor='blue' />
                     <ListItem onPress={()=> {Actions.FormHotel()}} >
                        <Body>
                            <Text>Pajak Hotel</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" style={{color: "#0098ff"}} />
                        </Right>
                    </ListItem>
                    <ListItem onPress={()=> {Actions.QuestionDetail({question: rowData})}} >
                        <Body>
                            <Text>Pajak Restoran</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" style={{color: "#0098ff"}} />
                        </Right>
                    </ListItem>
                    <ListItem onPress={()=> {Actions.QuestionDetail({question: rowData})}} >
                        <Body>
                            <Text>Pajak Hiburan</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" style={{color: "#0098ff"}} />
                        </Right>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}