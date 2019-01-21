import React from 'react';
import { 
    Text, 
    View } from 'react-native';

export const ConnectionStatus = (props) => {
        return (
          < View style={{ height: 25, backgroundColor:"#0e0d0d"}}>
            <Text style={{ color: 'white' }}>Connection Status: <Text style={{ color: '#66D9EF' }}>{props.ConnectionStatus}</Text></Text>
          </View >
        )
}