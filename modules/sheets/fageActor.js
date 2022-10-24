import { fage } from '../config.js';

export default class fageActor extends ActorSheet {

    // static get defaultOptions() {
    //     return mergeObject(super.defaultOptions, {
    //         classes: ["sheet", "actor"],
    //         template: `systems/fage/templates/sheets/${this.actor.data.type}-sheet.hbs`,
    //         width: 600,
    //         height: 600
    //     })
    // }
    
    get template(){
        return `systems/fage/templates/sheets/${this.actor.data.type}-sheet.hbs`;
    }

    getData(){
        const data = super.getData();
        data.config = CONFIG.fage;

        return data
    }

}