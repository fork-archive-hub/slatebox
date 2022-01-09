// methods.js
import { Meteor } from 'meteor/meteor';
import { CONSTANTS } from '../../imports/api/common/constants.js';
import { Collaborators } from '../../imports/api/common/models.js';

let method = {};
method[CONSTANTS.methods.collaborators.create] = async function(opts) {

  console.log("opts for collab ", opts);

  const collaborator = JSON.parse(JSON.stringify(opts));

  collaborator.heartbeat = true;
  collaborator.instanceId = opts.id;
  collaborator._id = opts.id;

  let user = Meteor.users.findOne(collaborator.userId) || { _id: "guest", isAnonymous: true };
  //it is possible user is empty if an unlisted or public slate is browsed
  //because userId sent in is just a random 8 digit char
  collaborator.isAnonymous = user.isAnonymous;

  if (user.isAnonymous) {
    collaborator.userName =  Meteor.userId() === user._id ? "You" : "Friend";
  } else {
    collaborator.userName = user.profile ? `${user.profile.firstName} ${user.profile.lastName}` : user.emails[0].address;
  }

  console.log("upserting collaborator", collaborator);
  Collaborators.upsert({ _id: collaborator._id }, collaborator);

  return collaborator;
}

Meteor.methods(method);