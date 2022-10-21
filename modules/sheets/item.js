export default class Item extends ItemSheet{
    get template(){
        return `systems/fage/templates/sheets/${this.item.data.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        data.config = CONFIG.fage;
        return data
    }

}