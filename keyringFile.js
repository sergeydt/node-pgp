var util = require("util");
var Keyring = require("./keyring");
var Fifo = require("./fifo");
var fs = require("fs");
var BufferedStream = require("./bufferedStream");
var consts = require("./consts");
var async = require("async");
var utils = require("./utils");

function getFileKeyring(fname, callback) {
	var ret = new _KeyringFile(fname);
	ret.revertChanges(callback);
}

function _KeyringFile(filename) {
	_KeyringFile.super_.call(this);

	this._filename = filename;
}

util.inherits(_KeyringFile, Keyring);

utils.extend(_KeyringFile.prototype, {
	getKeyList : function(filter) {
		return Keyring._filter(_getList(this._keys), filter);
	},

	keyExists : function(id, callback) {
		_exists(callback, this._keys, id);
	},

	getKey : function(id, callback) {
		_get(callback, this._keys, id);
	},

	_addKey : function(keyInfo, callback) {
		_add(callback, keyInfo, this._keys);
	},

	_updateKey : function(id, fields, callback) {
		_update(callback, fields, this._keys, id);
	},

	_removeKey : function(id, callback) {
		_remove(callback, this._keys, id);
	},

	getSubkeyList : function(keyId, filter) {
		return Keyring._filter(_getList(this._subkeys, keyId), filter);
	},

	subkeyExists : function(keyId, id, callback) {
		_exists(callback, this._subkeys, keyId);
	},

	getSubkey : function(keyId, id, callback) {
		_get(callback, this._subkeys, keyId);
	},

	_addSubkey : function(keyId, subkeyInfo, callback) {
		_add(callback, subkeyInfo, this._subkeys);
	},

	_updateSubkey : function(keyId, id, fields, callback) {
		_update(callback, fields, this._subkeys, keyId, id);
	},

	_removeSubkey : function(keyId, id, callback)
	{
		_remove(callback, this._subkeys, keyId, id);
	},

	getParentKeyList : function(subkeyId) {
		var ret = new Fifo();
		for(var i in this._keys)
		{
			if(this._subkeys[i] && this._subkeys[i][subkeyId])
				ret._add(i);
		}
		ret._end();
		return ret;
	},

	getIdentityList : function(keyId, filter) {
		return Keyring._filter(_getList(this._identities, keyId), filter);
	},

	identityExists : function(keyId, id, callback) {
		_exists(callback, this._identities, keyId);
	},

	getIdentity : function(keyId, id, callback) {
		_get(callback, this._identities, keyId);
	},

	_addIdentity : function(keyId, identityInfo, callback) {
		_add(callback, identityInfo, this._identities, keyId);
	},

	_updateIdentity : function(keyId, id, fields, callback) {
		_update(callback, fields, this._identities, keyId, id);
	},

	_removeIdentity : function(keyId, id, callback) {
		_remove(callback, this._identities, keyId, id);
	},

	getAttributeList : function(keyId, filter) {
		return Keyring._filter(_getList(this._attributes, keyId), filter);
	},

	attributeExists : function(keyId, id, callback) {
		_exists(callback, this._attributes, keyId);
	},

	getAttribute : function(keyId, id, callback) {
		_get(callback, this._attributes, keyId);
	},

	_addAttribute : function(keyId, attributeInfo, callback) {
		_add(callback, attributeInfo, this._attributes, keyId);
	},

	_updateAttribute : function(keyId, id, fields, callback) {
		_update(callback, fields, this._attributes, keyId, id);
	},

	_removeAttribute : function(keyId, id, callback) {
		_remove(callback, this._attributes, keyId, id);
	},

	getKeySignatureList : function(keyId, filter) {
		return Keyring._filter(_getList(this._keySignatures, keyId), filter);
	},

	getKeySignatureListByIssuer : function(issuerId, filter) {
		return Keyring._filter(_getList(this._keySignatures));
	},

	keySignatureExists : function(keyId, id, callback) {
		_exists(callback, this._keySignatures, keyId);
	},

	getKeySignature : function(keyId, id, callback) {
		_get(callback, this._keySignatures, keyId);
	},

	_addKeySignature : function(keyId, signatureInfo, callback) {
		_add(callback, signatureInfo, this._keySignatures, keyId);
	},

	_updateKeySignature : function(keyId, id, fields, callback) {
		_update(callback, fields, this._keySignatures, keyId, id);
	},

	_removeKeySignature : function(keyId, id, callback) {
		_remove(callback, this._keySignatures, keyId, id);
	},

	getSubkeySignatureList : function(keyId, subkeyId, filter) {
		return Keyring._filter(_getList(this._subkeySignatures, keyId));
	},

	subkeySignatureExists : function(keyId, subkeyId, id, callback) {
		_exists(callback, this._subkeySignatures, keyId, subkeyId);
	},

	getSubkeySignature : function(keyId, subkeyId, id, callback) {
		_get(callback, this._subkeySignatures, keyId, subkeyId);
	},

	_addSubkeySignature : function(keyId, subkeyId, signatureInfo, callback) {
		_add(callback, signatureInfo, this._subkeySignatures, keyId, subkeyId);
	},

	_updateSubkeySignature : function(keyId, subkeyId, id, fields, callback) {
		_update(callback, fields, this._subkeySignatures, keyId, subkeyId, id);
	},

	_removeSubkeySignature : function(keyId, subkeyId, id, callback) {
		_remove(callback, this._subkeySignatures, keyId, subkeyId, id);
	},

	getIdentitySignatureList : function(keyId, identityId, filter) {
		return Keyring._filter(_getList(this._identitySignatures, keyId), filter);
	},

	identitySignatureExists : function(keyId, identityId, id, callback) {
		_get(callback, this._identitySignatures, keyId, identityId);
	},

	getIdentitySignature : function(keyId, identityId, id, callback) {
		_get(callback, this._identitySignatures, keyId, identityId);
	},

	_addIdentitySignature : function(keyId, identityId, signatureInfo, callback) {
		_add(callback, signatureInfo, this._identitySignatures, keyId, identityId);
	},

	_updateIdentitySignature : function(keyId, identityId, id, fields, callback) {
		_update(callback, fields, this._identitySignatures, keyId, identityId, id);
	},

	_removeIdentitySignature : function(keyId, identityId, id, callback) {
		_remove(callback, this._identitySignatures, keyId, identityId, id);
	},

	getAttributeSignatureList : function(keyId, attributeId, filter) {
		return Keyring._filter(_getList(this._attributeSignatures, keyId), filter);
	},

	attributeSignatureExists : function(keyId, attributeId, id, callback) {
		_get(callback, this._attributeSignatures, keyId, attributeId);
	},

	getAttributeSignature : function(keyId, attributeId, id, callback) {
		_get(callback, this._attributeSignatures, keyId, attributeId);
	},

	_addAttributeSignature : function(keyId, attributeId, signatureInfo, callback) {
		_add(callback, signatureInfo, this._attributeSignatures, keyId, attributeId);
	},

	_updateAttributeSignature : function(keyId, attributeId, id, fields, callback) {
		_update(callback, fields, this._attributeSignatures, keyId, attributeId, id);
	},

	_removeAttributeSignature : function(keyId, attributeId, id, callback) {
		_remove(callback, this._attributeSignatures, keyId, attributeId, id);
	},

	saveChanges : function(callback) {
		var t = this;
		var stream = fs.createWriteStream(this._filename);

		var opt = { tag : consts.PKT.PUBLIC_KEY, list : t.getKeyList, get : t.getKey, sub : [
			{ tag : consts.PKT.SIGNATURE, list : t.getKeySignatureList, get : t.getKeySignature },
			{ tag : consts.PKT.USER_ID, list : t.getIdentityList, get : t.getIdentity, sub : [
				{ tag : consts.PKT.SIGNATURE, list : t.getIdentitySignatureList, get : t.getIdentitySignature }
			] },
			{ tag : consts.PKT.ATTRIBUTE, list : t.getAttributeList, get : t.getAttribute, sub : [
				{ tag : consts.PKT.SIGNATURE, list : t.getAttributeSignatureList, get : t.getAttributeSignature }
			] },
			{ tag : consts.PKT.PUBLIC_SUBKEY, list : t.getSubkeyList, get : t.getSubkeyList, sub : [
				{ tag: consts.PKT.SIGNATURE, list : t.getSubkeySignatureList, get : t.getSubkeySignature }
			] }
		] };

		function goThroughList(opt, args, callback) {
			opt.list.apply(t, args).forEachSeries(function(id, next1) {
				var args2 = args.concat([ id ]);
				opt.get.apply(t, args2.concat([ function(err, info) {
					if(err)
						return next1(err);

					stream.write(packets.generatePacket(opt.tag, info.binary));

					async.forEachSeries(opt.sub || [ ], function(sub, next2) {
						goThroughList(sub, args2, next2);
					}, next1);
				} ]));
			}, callback);
		}

		goThroughList(opt, [ ], function(err) {
			stream.end();
			callback(err);
		});
	},

	revertChanges : function(callback) {
		this._keys = { };
		this._subkeys = { };
		this._identities = { };
		this._attributes = { };
		this._keySignatures = { };
		this._subkeySignatures = { };
		this._identitySignatures = { };
		this._attributeSignatures = { };

		var lastKeyId = null;
		var lastSubkeyId = null;
		var lastIdentityId = null;
		var lastAttributeId = null;

		var t = this;

		packets.splitPackets(fs.createReadStream(this._filename)).forEachSeries(function(tag, header, body, next) {
			getPacketInfo(tag, body, function(err, info) {
				if(err)
					return callback(err);

				switch(tag) {
					case consts.PKT.PUBLIC_KEY:
						lastKeyId = info.id;
						lastSubkeyId = lastIdentityId = lastAttributeId = null;
						t.addKey(info, next);
						break;
					case consts.PKT.PUBLIC_SUBKEY:
						if(lastKeyId != null)
						{
							lastSubkeyId = info.id;
							lastIdentityId = lastAttributeId = null;
							t.addSubkey(lastKeyId, info, next);
						}
						else
							next();
						break;
					case consts.PKT.USER_ID:
						if(lastKeyId != null)
						{
							lastIdentityId = info.id;
							lastSubkeyId = lastAttributeId = null;
							t.addIdentity(lastKeyId, info, next);
						}
						else
							next();
						break;
					case consts.PKT.ATTRIBUTE:
						if(lastKeyId != null)
						{
							lastAttributeId = info.id;
							lastSubkeyId = lastIdentityId = null;
							t.addAttribute(lastKeyId, info, next);
						}
						else
							next();
						break;
					case consts.PKT.SIGNATURE:
						if(lastSubkeyId != null)
							t.addSubkeySignature(lastKeyId, lastSubkeyId, info, next);
						else if(lastIdentityId != null)
							t.addIdentitySignature(lastKeyId, lastIdentityId, info, next);
						else if(lastAttributeId != null)
							t.addAttributeSignature(lastKeyId, lastAttributeId, info, next);
						else if(lastKeyId != null)
							t.addKeySignature(lastKeyId, info, next);
						else
							next();
						break;
					default:
						next();
						break;
				}
			});
		}, callback);
	}
});

function _getItem(obj, args, make) {
	for(var i=offset; i<args.length; i++) {
		if(obj[args[i]] == null)
		{
			if(make)
				obj[args[i]] = { };
			else
				return null;
		}
		obj = obj[args[i]];
	}
	return obj;
}

function _getList(obj, idx) {
	obj = _getItem(obj, utils.toProperArray(arguments).slice(2));

	return Fifo.fromArraySingle(Object.keys(obj));
}

function _exists(callback, obj, idx) {
	callback(null, _getItem(obj, utils.toProperArray(arguments).slice(2)) != null);
}

function _get(callback, obj, idx) {
	obj = _getItem(obj, utils.toProperArray(arguments).slice(2));

	if(obj == null)
		callback(null, null);
	else
		callback(null, obj);
}

function _add(callback, item, obj, idx) {
	obj = _getItem(obj, utils.toProperArray(arguments).slice(3), true);

	obj[item.id] = item;
	callback(null);
}

function _update(callback, fields, obj, idx) {
	obj = _getItem(obj, utils.toProperArray(arguments).slice(3));

	if(obj == null)
		callback(new Error("Item not found."));
	else
	{
		utils.extend(obj, fields);
		callback(null);
	}
}

function _remove(callback, obj, idx) {
	obj = _getItem(obj, utils.toProperArray(arguments).slice(2, -1));

	var idx = arguments[arguments.length-1];
	if(obj && obj[idx] != null)
	{
		delete obj[idx];
		callback(null);
	}
	else
		callback(new Error("Item not found."));
}

exports.getFileKeyring = getFileKeyring;