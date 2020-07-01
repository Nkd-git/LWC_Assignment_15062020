import { LightningElement, track } from 'lwc';

export default class LwcPocReq15062020 extends LightningElement {
    @track accountNm;
    @track recordNumber;
    fetchAccounts;

    // Fetch the Account Name
    handleName(event) {
        this.fetchAccounts = false;
        const accName = event.target.value;
        this.accountNm = accName.trim();
    }
    // Fetch the number of records to return

    handleNumber(event) {
        this.fetchAccounts = false;
        const accNumber = event.target.value;
        this.recordNumber = accNumber.trim();
    }
    // Check valid inputs
    handleSearch(event) {
        if ((this.accountNm != undefined && this.accountNm != '') && (this.recordNumber != undefined && this.recordNumber != '' && this.recordNumber != 0)) {
            this.fetchAccounts = true;
        } else {
            this.fetchAccounts = false;
        }
        console.log('Account Name: ' + this.accountNm + ' and account number is: ' + this.recordNumber + ' ' + this.fetchAccounts);
    }

}