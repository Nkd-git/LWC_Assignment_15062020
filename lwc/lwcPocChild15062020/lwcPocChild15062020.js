import { LightningElement, wire, api, track } from 'lwc';
import getAccounts from '@salesforce/apex/FetchAccounts.getAccounts'

export default class LwcPocChild15062020 extends LightningElement {
    @api accountName;
    @api recdNum;
    @track accounts;
    @track error;
    @track filterValue;
    accountsArray = [];
    toggleAccounts;
    loadedData;
    // Fetch the accounts from server
    @wire(getAccounts, { searchAcc: '$accountName', limitRecds: '$recdNum' }) accountsList({ error, data }) {
        if (data) {
            this.accounts = data;
            this.accountsArray.push(...this.accounts);
            console.log('WIRED ACCOUNTS ' + this.accounts);
            this.error = undefined;
            this.loadedData = true;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        } else {
            this.loadedData = false;
        }
    }
    // Fetch the filter text
    handleFilter(event) {
        this.filterValue = event.target.value;
    }
    // Logic for filter results
    handleFilterData() {
        var accountsFiltered = [];
        this.error = undefined;
        let textVal = this.filterValue.replace(/%/g, "");
        this.accountsArray.forEach(entryVal => {
            if (entryVal.Name.trim().includes(textVal.trim()) && textVal.trim().length > 0) {
                accountsFiltered.push(entryVal);
                console.log('Matched Accounts:- ' + accountsFiltered);
            };
        });
        if (textVal.trim().length == 0 || this.filterValue == undefined) {
            this.accounts = [...this.accountsArray];
        } else if (textVal.trim().length > 0 && accountsFiltered != undefined && accountsFiltered != '') {
            this.accounts = [...accountsFiltered];
        }
        else {
            this.accounts = undefined
            this.error = 'No accounts found';
            console.log('Unmatched Accounts');
        }

    }

}