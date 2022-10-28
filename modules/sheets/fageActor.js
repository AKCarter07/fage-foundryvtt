import { fage } from '../config.js';

export default class fageActor extends ActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["fage", "sheet", "actor"],
            // template: `systems/fage/templates/sheets/${this.actor.data.type}-sheet.hbs`,  why won't this work?????
            width: 600,
            height: 600
        })
    }
    
    get template(){
        return `systems/fage/templates/sheets/${this.actor.data.type}-sheet.hbs`;
    }

    getData(){
        const context = super.getData();
        context.config = CONFIG.fage;

        const actorData = context.actor.data;

        context.data = actorData.data;
        context.flags = actorData.flags;

        if(actorData.type == 'pc'){
            this._prepareItems(context);
            this._prepareCharacterData(context);
        }

        if (actorData.type == 'npc') {
            this._prepareItems(context);
        }

        context.rollData = context.actor.getRollData();
        // context.effects = prepareActiveEffectCategories(this.actor.effects);

        context.focuses  = context.items.filter(function(item) {return item.type == "focus"});

        return context;
    }

    activateListeners(html) {
        //html.find(cssSelector.event(this._someCustomFunction.bind(this)));
        html.find(".item-edit").click(this._onItemEdit.bind(this));
        html.find(".item-delete").click(this._onItemDelete.bind(this));


        super.activateListeners(html);
    }

    _onItemEdit(event){
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".actor-item").dataset.itemId;
        let item = this.actor.items.get(`${itemId}`);
            
        item.sheet.render(true);
    }

    _onItemDelete(event) {
        event.preventDefault();
        console.log("item delete clicked");
        let element = $(event.currentTarget).parents(".item");
        let itemId = this.actor.items.get(element.data("itemId"));
        // let itemId = element.closest(".actor-item").dataset.itemId;
        console.log(itemId);
        return this.actor.deleteOwnedItem(itemId);
    }

    _prepareItems(context){
        const gear = [];
        const spells = [];
        const talents = [];
        const focuses = [];
        const specializations = [];

        for (let i of context.items) {
            i.img = i.img || DEFAULT_TOKEN;

            if (i.type === "weapon" || i.type === "armor" || i.type === "shield") {
                gear.push(i);
            }
            else if (i.type === "spell"){
                spells.push(i);
            }
            else if (i.type === "talent"){
                talents.push(i);
            }
            else if (i.type === "focus"){
                focuses.push(i);
            }
            else if (i.type === "specialization"){
                specializations.push(i);
            }
        }
        context.gear = gear;
        context.spells = spells;
        context.talents = talents;
        context.focuses = focuses;
        context.specializations = specializations;
    }

    _prepareCharacterData(context){
        console.log(context.data);
        for (let [ability, abilData] of Object.entries(context.data.abilities)){
            abilData.label = game.i18n.localize(CONFIG.fage.stats[ability]) ?? ability;
            console.log(abilData.label + " " + abilData.value)
            
        }
    }

}