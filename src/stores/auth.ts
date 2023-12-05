import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    let sessionPassphrase: string = '';

    if(sessionStorage.getItem('passphrase') && sessionStorage.getItem('passphrase') !== ''){
        sessionPassphrase = atob(sessionStorage.getItem('passphrase') as string);
    }else{
        ask();
    }

    function get(){
        if(!sessionPassphrase){
            if(!ask()){
                throw new Error('No passphrase');
            }
        }

        return sessionPassphrase;
    }

    function set(passphrase: string){
        sessionPassphrase = passphrase;
        sessionStorage.setItem('passphrase', btoa(passphrase));
    }

    function ask(){
        let passphrase = prompt('Please enter your passphrase');
        if(!passphrase || passphrase === ''){
            return false;
        }

        set(passphrase as string);
        return true;
    }

    return { get, ask }
})
