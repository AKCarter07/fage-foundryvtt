import { fage } from "./modules/config.js";
import fageItem from "./modules/sheets/fageItem.js";
import fageActor from "./modules/sheets/fageActor.js";

async function preloadHbsTemplates() {
    const templatePaths = [
        "systems/fage/templates/partials/stats.hbs"
    ];
    return loadTemplates(templatePaths);
}


Hooks.once("init", function(){
    console.log("FAGE | Initialising FAGE system");

    CONFIG.fage = fage;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("fage", fageItem, {makeDefault: true});

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("fage", fageActor, {makeDefault: true});

    preloadHbsTemplates;
})