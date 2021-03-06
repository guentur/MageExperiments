define([
    'jquery',
    'uiComponent',
    'ko'
], function ($, Component, ko) {
    'use strict';

    return Component.extend({
        myTimer: ko.observable(0),
        red: ko.observable(0),
        blue: ko.observable(0),
        green: ko.observable(0),
        initialize: function () {
            self = this;
            this._super();
            //call the incrementTime function to run on intialize
            this.incrementTime();
            this.subscribeToTime();
            this.randomColour = ko.pureComputed(function() {
                //return the random colour value
                return 'rgb(' + this.red() + ', ' + this.blue() + ', ' + this.green() + ')';
            }, this);
        },
        //increment myTimer every second
        incrementTime: function() {
            var t = 0;
            setInterval(function() {
                t++;
                self.myTimer(t);
            }, 3000);
        },
        subscribeToTime: function() {
            this.myTimer.subscribe(function(newValue) {
                console.log(newValue);
                setInterval(function() {
                    self.updateTimerTextColour();
                }, 1000);
            });
        },
        randomNumber: function() {
            return Math.floor((Math.random() * 255) + 1);
        },
        updateTimerTextColour: function() {
            //define RGB values
            /*notice we now no longer have to set and return the RBG style code here
             we simply update the red/blue/green observables and the computed observable
             returns the style element to the template */
            this.red(self.randomNumber());
            this.blue(self.randomNumber());
            this.green(self.randomNumber());
        }

    });
});
