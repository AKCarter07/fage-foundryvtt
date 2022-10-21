import { fage } from "./modules/config.js";
import Item from "./modules/sheets/item.js";
console.log("pre-initializing FAGE system")

Hooks.once("init", function(){
    console.log("FAGE | Initialising FAGE system");

    CONFIG.fage = fage;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("fage", Item, {makeDefault: true});
})