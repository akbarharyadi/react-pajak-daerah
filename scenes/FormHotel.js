import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { Header, Title, Container, Content, Left, Body, Right, List, ListItem, InputGroup,
    Text, Icon, Button, Form, Input, Label, Item, Picker, ActionSheet, Card, CardItem } from 'native-base'; 
import { Actions } from 'react-native-router-flux';

import DatePicker from 'react-native-datepicker';

import moment from 'moment';

export default class FormHotel extends Component {

    constructor(){
        super();
        this.state = {
            th_spt: "",
            no_pokok: "",
            id_ayt: "",
            rekening: "",
            list_rekening: [],
            selected: [],
            tgl_awal:"",
            tgl_akhir:"",
            omzet:"",
            jml_pajak: ""
        }
    }

    simpan() {
    // call getValue() to get the values of the form
        var value = this.refs.form_pendataan.getValue();
        //if (value) { // if validation fails, value will be null
        console.log(value); // value here is an instance of Person
        //}
    }

    onChangedText(text) {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if ( numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
        }

        var baseURL = 'http://192.168.12.225/esptpd-purwakarta/index.php?r=pad%2Fapi%2Finduk-pajak&year=' + newText + '&code=1101';
        fetch(baseURL, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
        .then(response => { return response.json();})
        .then(responseData => {console.log(responseData); return responseData;})
        .then(data => {this.setState({"list_rekening" : data});})
        .catch(err => {
            console.warn(xhr.responseText)
            console.log("fetch error" + err);
        });

        return newText
    }

    onValueChange (value: string) {
        this.setState({
            selected : value
        });
    }


    renderHeader(){
      const{title} = this.props
      return(
          <Header>
            <Left>
                <Button transparent onPress={()=> Actions.pop()}>
                    <Icon name="arrow-back" style={{color: "#FFF"}} />
                </Button>
            </Left>
            <Body>
                <Title>
                    {title}
                </Title>
            </Body>
            <Right/>
          </Header>
      )
    }  

    render() {
        return (
            <Container>
                {this.renderHeader()}
                <Content>
                    <List>
                        <ListItem>
                            <InputGroup borderType='underline'>
                                <Input
                                    keyboardType = 'numeric'
                                    placeholder = 'Tahun SPT'
                                    onChangeText = {(text)=> this.setState({th_spt: this.onChangedText(text)})}
                                    value = {this.state.th_spt}
                                    maxLength = {4} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup borderType='underline'>
                                <Input 
                                    placeholder = 'No Pokok'
                                    keyboardType = 'numeric'
                                    onChangeText = {(text)=> this.setState({no_pokok: this.onChangedText(text)})}
                                    value = {this.state.no_pokok}
                                    maxLength = {7} />
                            </InputGroup>
                        </ListItem>
                            <Picker
                                style={{margin: 10, borderBottomColor:'gray', borderBottomWidth: 1}}
                                headerComponent={
                                    <Header>
                                        <Button transparent>
                                            Kembali
                                        </Button>
                                        <Title>Pajak Hotel</Title>
                                    </Header>
                                }
                                mode='dropdown'
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}>
                                {this.state.list_rekening.map((data, index) => {return <Item value={data.id} label={data.nm_ayt} key={index}  /> })}
                            </Picker>
                        <ListItem>
                            <InputGroup>
                                <DatePicker
                                    date={this.state.tgl_awal}
                                    mode="date"
                                    placeholder="Pilih Periode Awal"
                                    format="DD-MM-YYYY"
                                    confirmBtnText="Ok"
                                    cancelBtnText="Batal"
                                    androidMode="spinner"
                                    customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                        borderWidth: 0
                                    }
                                    }}
                                    onDateChange={(date) => {
                                        this.setState({tgl_awal: date});
                                        var parts = date.split('-');
                                        var now = new Date(parts[2], parts[1] - 1, parts[0]);
                                        var lastDayOfTheMonth = new Date(1900 + now.getYear(), now.getMonth() + 1, 0);
                                        if (date != '') {
                                            this.setState({tgl_akhir: lastDayOfTheMonth});
                                        }
                                    }}
                                />
                                <DatePicker
                                    date={this.state.tgl_akhir}
                                    mode="date"
                                    placeholder="Pilih Periode Akhir"
                                    format="DD-MM-YYYY"
                                    confirmBtnText="Ok"
                                    cancelBtnText="Batal"
                                    androidMode="spinner"
                                    customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                        borderWidth: 0
                                    }
                                    }}
                                    onDateChange={(date) => {this.setState({tgl_akhir: date})}}
                                />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input
                                    keyboardType = 'numeric'
                                    placeholder = 'Omzet'
                                    onChangeText = {(text)=> this.setState({omzet: this.onChangedText(text)})}
                                    value = {this.state.omzet} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input
                                    keyboardType = 'numeric'
                                    placeholder = 'Jumlah Pajak'
                                    onChangeText = {(text)=> this.setState({jml_pajak: this.onChangedText(text)})}
                                    value = {this.state.jml_pajak} />
                            </InputGroup>
                        </ListItem>
                    </List>
                    <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                        <Text>Save</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}