/* eslint-disable no-inner-declarations */
// methods.js
import { Meteor } from 'meteor/meteor';
import { CONSTANTS } from '../../imports/api/common/constants.js';
import CryptoJS from 'crypto-js';

let method = {};

method[CONSTANTS.methods.chatWoot.identifyUser] = async function () {
  if (Meteor.userId() && Meteor.settings.chatWoot.userIdentityValidationToken) {
    const hash = CryptoJS.HmacSHA256(Meteor.userId(), Meteor.settings.chatWoot.userIdentityValidationToken).toString(CryptoJS.enc.Hex);
    return hash;
  }
};

Meteor.methods(method);