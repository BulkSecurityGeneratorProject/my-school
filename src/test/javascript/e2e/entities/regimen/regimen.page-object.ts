import { element, by, ElementFinder } from 'protractor';

export class RegimenComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-regimen div table .btn-danger'));
    title = element.all(by.css('jhi-regimen div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RegimenUpdatePage {
    pageTitle = element(by.id('jhi-regimen-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    regimenLabelInput = element(by.id('field_regimenLabel'));
    descriptionInput = element(by.id('field_description'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setRegimenLabelInput(regimenLabel) {
        await this.regimenLabelInput.sendKeys(regimenLabel);
    }

    async getRegimenLabelInput() {
        return this.regimenLabelInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class RegimenDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-regimen-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-regimen'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}