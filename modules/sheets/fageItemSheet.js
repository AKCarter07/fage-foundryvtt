import { fage } from '../config.js';

export default class fageItem extends ItemSheet{

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 530,
            // height: 440,
            classes: ["fage", "sheet", "item"]
        });
    }

    get template(){
        return `systems/fage/templates/sheets/${this.item.data.type}-sheet.hbs`;
    }


    getData(){
        const data = super.getData();
        data.config = CONFIG.fage;

        return data
    }

    activateListeners(html) {
        super.activateListeners(html);
        if (!this.options.editable) return;

        
    }

}