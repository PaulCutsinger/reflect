/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function () {
        this.emit('Reflect', this.event.request, 'LaunchRequest', false);
    },
    'Unhandled': function () {
        this.emit('Reflect', this.event.request, this.event.request.intent.name, true);
    },
    'DebugIntent': function () {
        debugOptions.call(this);
        
        this.emit(':ask', "debug on, what would you like to do?", "debug on, what would you like to do?");
    },
    'Reflect': function (request, intentName, isIntent) {
        getIntent(intentName);
        this.attributes['speechOutput']=intentName+". ";
        if (isIntent) {
            saySlots.call(this, request, intentName);
        }
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['speechOutput'] )
    }
    
};

function getIntent(intentName){
        console.log(intentName);
}

function saySlots(request, intentName){
        this.attributes['speechOutput']+=" slots are ";
        
        console.log('in getSlots');
        var slots = request.intent && request.intent.slots;
        console.log('slotExists '+JSON.stringify(slots));
        if (slots) {
            for (var slot in slots)
            {
                console.log(slot);
                var slotName=slots[slot].name;
                var slotValue=slots[slot].value;
                //console.log(key + ' : ' + data[key]);
                console.log(slot + ' > ' + slotName + ' > '+ slotValue);
                if (slotValue !== undefined) { 
                    this.attributes['speechOutput']+=" "+slot+" is <say-as interpret-as='spell-out'>"+slotValue+"</say-as>. ";
                }
                    
            }
        }
}

function debugOptions(){
         console.log('debug');
         //TODO verbose mode, say as
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
