/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    // Julia custom

    WA.room.onEnterLayer("floor").subscribe(() => {
        WA.room.hideLayer("roof");
        WA.room.hideLayer("walls-bg-front");
        WA.room.hideLayer("sign");
      });
      
    WA.room.onLeaveLayer("floor").subscribe(() => {
        WA.room.showLayer("roof");
        WA.room.showLayer("walls-bg-front");
        WA.room.showLayer("facade-furniture-bg");
        WA.room.showLayer("sign");
      });

      WA.room.onEnterLayer("rooms_floor").subscribe(() => {
        WA.room.hideLayer("facade-furniture-fg");
        WA.room.hideLayer("facade");
        WA.room.hideLayer("facade-furniture-bg");
      });
      
    WA.room.onLeaveLayer("rooms_floor").subscribe(() => {
        WA.room.showLayer("facade-furniture-fg");
        WA.room.showLayer("facade");
        WA.room.showLayer("facade-furniture-bg");
      });
    
    //Popup Liberary
    WA.room.onEnterLayer('message-1').subscribe(() => {
        currentPopup = WA.ui.openPopup("Addon1Pop","Library",[]);
    })
    WA.room.onLeaveLayer('message-1').subscribe(closePopup)

    //Popup Ocean
    WA.room.onEnterLayer('message-3').subscribe(() => {
        currentPopup = WA.ui.openPopup("Addon3Pop","Ocean",[]);
    })
    WA.room.onLeaveLayer('message-3').subscribe(closePopup)

    //Popup Playground
    WA.room.onEnterLayer('message-2').subscribe(() => {
        currentPopup = WA.ui.openPopup("Addon2Pop","Playground",[]);
    })
    WA.room.onLeaveLayer('message-2').subscribe(closePopup)

    //Popup Amphitheater
    WA.room.onEnterLayer('message-4').subscribe(() => {
        currentPopup = WA.ui.openPopup("Addon4Pop","Amphitheater",[]);
    })
    WA.room.onLeaveLayer('message-4').subscribe(closePopup)


    //Popup Science Cluster
    WA.room.onEnterLayer('message-5').subscribe(() => {
        currentPopup = WA.ui.openPopup("Addon5Pop","Science Cluster",[]);
    })
    WA.room.onLeaveLayer('message-5').subscribe(closePopup)

    //Popup Club House
    WA.room.onEnterLayer('message-6').subscribe(() => {
        currentPopup = WA.ui.openPopup("Addon6Pop","Club House",[]);
    })
    WA.room.onLeaveLayer('message-6').subscribe(closePopup)
      
    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
