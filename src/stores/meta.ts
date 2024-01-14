import { defineStore } from "pinia";


export const useMetaStore = defineStore("meta", {
    state: () => ({
        pendingRequests: 0,
        finishedRequests: 0,
    }),
    actions: {
        pending(){
            if(this.pendingRequests === this.finishedRequests){
                this.pendingRequests = 0;
                this.finishedRequests = 0;
            }
            this.pendingRequests++;
        },
        finish(){
            this.finishedRequests++;
        }
    }
});