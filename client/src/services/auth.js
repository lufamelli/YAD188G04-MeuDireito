export const TOKEN_KEY = '&app-token';
export const ID_USUARIO = '&id-usuario';
export const NOME_USUARIO = '&nome-usuario';
export const SOBRENOME_USUARIO = '&sobrenome-usuario';
export const NUMERO_OAB = '&oab-usuario';

export const login = token => { localStorage.setItem(TOKEN_KEY, token);}
export const logout = () => { localStorage.clear()};

export const setIdUser = id =>  localStorage.setItem(ID_USUARIO,id);
export const getIdUser = () =>  localStorage.getItem(ID_USUARIO);

export const setNomeUser = nome =>  localStorage.setItem(NOME_USUARIO,nome);
export const getNomeUser = () => localStorage.getItem(NOME_USUARIO);

export const setOab = oabNumber =>  localStorage.setItem(NUMERO_OAB,oabNumber);
export const getOab = () => localStorage.getItem(NUMERO_OAB);

export const setSobrenomeUser = sobrenome =>  localStorage.setItem(SOBRENOME_USUARIO,sobrenome);
export const getSobrenomeUser = () =>  localStorage.getItem(SOBRENOME_USUARIO);

export const getToken = () => localStorage.getItem(TOKEN_KEY)