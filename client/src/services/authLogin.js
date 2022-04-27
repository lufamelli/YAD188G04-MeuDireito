import React, { useEffect, useState } from 'react';
import api from './api';
import { login, logout, getToken } from './auth';
import { Route, Navigate } from 'react-router-dom';
//import LinearProgress from '@material-ui/core/LinearProgress';

export default function AuthLogin({component: Component, ...rest}) {
    const [ redirect, setRedirect ] = useState(false);
    const [ load, setLoad ] = useState(true);

    useEffect(() => {
        async function verify(){
            var res = await api.get('/user/checktoken', {params:{token:getToken()}});

            if(res.data.status===200){
                setLoad(false);
                setRedirect(false);
            }else{
                logout();
                setLoad(false);
                setRedirect(true);
            }
        }
        // setTimeout(() => verify(),1000);
        verify();
    },[])

    return(
        load?'Carregando':<Route { ...rest}
        render={props => !redirect?(
            <Component {...props } />
        ):<Navigate to={{pathname: "/user",state:{ from: props.location}}} />
        } />
    )
}