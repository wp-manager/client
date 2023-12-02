import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Encryption from '@/utils/encryption';

export const useAuthStore = defineStore('auth', () => {
    let sessionPassphrase: string|null = null;

    if(sessionStorage.getItem('passphrase')){
        sessionPassphrase = sessionStorage.getItem('passphrase') as string;
    }else{
        ask();
    }

    function get(){
        return sessionPassphrase;
    }

    function set(passphrase: string){
        sessionPassphrase = passphrase;
        sessionStorage.setItem('passphrase', passphrase);
    }

    function ask(){
        let passphrase = prompt('Please enter your passphrase');
        if(!passphrase){
            return false;
        }

        set(passphrase as string);
        return true;
    }

    return { get, set, ask }
})
