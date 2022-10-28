export class fageActor extends Actor {
    prepareData(){
        super.prepareData();
    };
    prepareBaseData(){};

    prepareDerivedData(){
        const actorData = this.data;
        const data = actorData.data;
        const flags = actorData.flags.fage || {};

        this._preparePCData(actorData);
        this._prepareNPCData(actorData);
    }

    _preparePCData(actorData){
        if (actorData.type !== 'pc') {return};

        const data = actorData.data;
    }

    _prepareNPCData(actorData){
        if (actorData.type !== 'npc') {return};

        const data = actorData.data;

    }

    // ROLLs -------------------------------------------------------------
    //(copy-pasted from https://foundryvtt.wiki/en/development/guides/SD-tutorial/SD06-Extending-the-Actor-class#actorgetrolldata)

    getRollData() {
        const data = super.getRollData();
      
        // Prepare character roll data.
        this._getCharacterRollData(data);
        this._getNpcRollData(data);
      
        return data;
      }
      
      /**
       * Prepare character roll data.
       */
      _getCharacterRollData(data) {
        if (this.data.type !== 'character') return;
      
        // Copy the ability scores to the top level, so that rolls can use
        // formulas like `@str.mod + 4`.
        if (data.abilities) {
          for (let [k, v] of Object.entries(data.stats)) {
            data[k] = foundry.utils.deepClone(v);
          }
        }
      
        // Add level for easier access, or fall back to 0.
        if (data.attributes.level) {
          data.lvl = data.attributes.level.value ?? 0;
        }
      }
      
      /**
       * Prepare NPC roll data.
       */
      _getNpcRollData(data) {
        if (this.data.type !== 'npc') return;
      
        // Process additional NPC data here.
      }

}