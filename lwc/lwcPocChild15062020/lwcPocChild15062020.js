import { LightningElement,wire,api,track} from 'lwc';
import getAccounts from '@salesforce/apex/FetchAccounts.getAccounts'

export default class LwcPocChild15062020 extends LightningElement {
    @api accountName;
    @api recdNum;
    @track accounts;
    @track error;
    @track filterValue;
    accountsArray=[];
    //accountsFiltered=[];
    toggleAccounts;
    loadedData;
    //accountName='Nish';
    //recdNum=4;

    @wire(getAccounts,{searchAcc : '$accountName',limitRecds : '$recdNum'}) accountsList({ error, data }){
        if (data) {
            this.accounts = data;
            this.accountsArray.push(...this.accounts);
            console.log(this.accounts);
            this.error = undefined;
            this.loadedData=true;
         } else if (error) {
            this.error = error;
            this.accounts = undefined;
            //console.log(error);
      }else{
          this.loadedData = false;
      }
    }
    checkAccount(value){
       return value == this.filterValue;
      }
    handleFilter(event){
        this.filterValue = event.target.value;
    }
    handleFilterData(){
        var accountsFiltered=[];
        this.error = undefined;
        let textVal = this.filterValue.replace(/%/g, "");
        this.accountsArray.forEach(entryVal => {
        if(entryVal.Name.trim().includes(textVal.trim()) && textVal.trim().length>0 ){
        accountsFiltered.push(entryVal);
        console.log('Matched Accounts:- '+accountsFiltered);
    };
    });
     if(textVal.trim().length == 0 || this.filterValue==undefined){
        this.accounts=[...this.accountsArray];
    }else if(textVal.trim().length > 0 && accountsFiltered != undefined && accountsFiltered != ''){
        this.accounts=[...accountsFiltered];
    }
    else{
        this.accounts = undefined
        this.error = 'No accounts found';
        console.log('Unmatched Accounts');
    }
    }

}