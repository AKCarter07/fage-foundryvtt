import { fage } from "./modules/config.js";
import fageItem from "./modules/sheets/fageItemSheet.js";
import fageActor from "./modules/sheets/fageActorSheet.js";

function preloadHandlebarsTemplates() {
    console.log("FAGE | in preloadHandlebarsTemplates");
    const templatePaths = [
        "systems/fage/templates/partials/stats.hbs"
    ];
    return loadTemplates(templatePaths);
};


Hooks.once("init", function(){
    console.log("FAGE | Initialising FAGE system");

    CONFIG.fage = fage;
    CONFIG.Combat.initiative = {
        formula: "3d6 + @stats.abilities.dex.value",
        decimals: 0
    }
    preloadHandlebarsTemplates();

    game.fage = {
        fageActor,
        fageItem
    };



    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("fage", fageItem, {makeDefault: true});

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("fage", fageActor, {makeDefault: true});

    
});

Handlebars.registerHelper('val', function(stat) {
    return `fage.stats.${stat}`;
});

Handlebars.registerHelper('compare', function(val1, val2){
    if (val1 === val2){
        return true;
    }
    else {return false;}
});
