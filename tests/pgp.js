var pgp = require("..");

var TESTKEY1 = "\x99\x01\xa2\x04PW7\x9c\x11\x04\x00\x93\\:\xb9\xdf\x110A\xc9\x89\xcc\x88\x84_\xd0\
\xd3\x14\xec9\xa7\xaf  ;6\xbd[J\x9c\xeb{\x80\xf9qy\xd4\x8f\xc6\x06\xa8\xfe\x10\x97g\"\x11J\xbd\xb9\
&r\x0b\xdc\x7f4\x98\x85\xff\x8e\x86N\xf9\xc0F\xb0\xb0\xb9]BR\x9c\xb4\xd4\x10\x18'(\xa1Q\x0a\xa1\xc2\
fM=\xc7ds\xd4R\xf2\xcft\xf1\xbdt\xc6s\xd4\xb5.p2\xaej6!I\x14\xcf\xcc\xa4m?\x9eaO\xc1N\x91\xfb\x1d\
\xca\xcf\xd2c|\x1f\x00\xa0\xcf\x19\xab\x82\x0ar\x85\xa91\x0cq\xdb|\xb8\x0c\x00\xd64\xa9\x97\x04\x00\
\x84M&9\xf8\xa4\x008\"d\xf3<x-\xeb\xbd\x89\x12_\xd1\xfb\x1a,..\x0a\xe4\x1e\xf0a\xbeM9\x19+{\x92\xbf\
\xb6*;\xc8\x82M\x19\xaf\x96\xcaCf\xcf\xb1\x84\x0c\xa2\xfd\xa3\xd4\x9f\x89~\xb8\xad\xeb9\xf7\xbe\x0c\
\xf70\xd4\xfe\xe0\x19\x01^q\x92\xb2\xbb\xaa_\xc1[\x17\xd1\xfe\xdc&\x97C\xa8\xee\xcb\x97\x88>M/\xd71\
\xe0~\xb6\xc6i\x0a\x03\x89\x14vLE\x14\x14\xb0\xfd\xaa\xba\x0ev\xcd\xffh\xd6\xad\xac\x00\x03\xfd\x12\
\x0c\xb4\xb0\xb8\xf3\xc2\xf2M\xef\xedQ(\xf3\xf2C\xac\x07\xcb\x83\x0eK\xd3\x9ax\xbb\xe3H\x041,Mq\xe6\
\x1aL|\xe3\xe0n>\x83\xd6i\x0c=\x9b\xeba,\xa1\xc9J\xdelF\xb9VI\xdfxfr;\xd9E\xa4\xad{Q\xc9gS)02\xbc\x82\
\x82\xfe\x1a\x1c\xeb\xdcB{\x1dk\xd3[#\xb1\xb8s\x90,\xe1\xe6\x9d\xcb\x91\xbc\x91\x17\xfc\x07\xb1^\x11v\
\xf8\xd4\x07@\x8a\x97;\x82'\xe0|\x02\xc6\x15\xc1\x0fp,\xb4\x1bblablabla <bla@example.com>\x88h\x04\x13\
\x11\x02\x00(\x02\x1b\x03\x06\x0b\x09\x08\x07\x03\x02\x06\x15\x08\x02\x09\x0a\x0b\x04\x16\x02\x03\x01\
\x02\x1e\x01\x02\x17\x80\x05\x02PW\x9f$\x05\x09\x00\x0a\xf3\x88\x00\x0a\x09\x10;C\x85\xadw\x12FA\x08\
\xdc\x00\xa0\x9786!r\x08\xc2^R\x904\x90Q\x9a C\xf96pc\x00\x9c\x0a+_{{h\x82\xd6\xc0\x0e\x06I\xfd U\xa0\
B\x0a\xd2m";

var TESTKEY2 = "-----BEGIN PGP PUBLIC KEY BLOCK-----\
Version: GnuPG v2.0.19 (GNU/Linux)\
\
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\
t+jghD5F35PW6wGpB7+hgquNYDXU4GCavbkFSEly99lfWHSv8Lr6ViqcK+ZgMkPm\
PW2Tu4K3zcll0ug4K9Fk4czG6dygLaXxrErlU3cbRPdNIArgDYgUwUfBCqoYOEcB\
VVu9cAzebjlJsyGEhwUmIGTJbxEp8AqNZsouBbQ3pWbOO0M1XPJ2pWwr+WaNzM99\
LajUpqbmk4WbrjvZMJDK/tXMcjrjSUiUClvgzJB/5M+OqrTs4pDK/Lg+CjuTxr37\
8RQ8ZWAdiupXwroi0dam1qQBEAABAQAAAAAAAAAAAAAAAP/Y/+AAEEpGSUYAAQEB\
AGAAYAAA/+EOykV4aWYAAElJKgAIAAAACwAOAQIADgAAAJIAAAAPAQIAIAAAAKAA\
AAAQAQIAIAAAAMAAAAASAQMAAQAAAAEAAAAaAQUAAQAAAOAAAAAbAQUAAQAAAOgA\
AAAoAQMAAQAAAAIAAAAxAQIADAAAAPAAAAAyAQIAFAAAAPwAAAATAgMAAQAAAAEA\
AABphwQAAQAAABABAACIAwAARENJTVwxMDBNRURJQQAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAERWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
SAAAAAEAAABIAAAAAQAAAFZlci4xLjAuMDAwADIwMTE6MDY6MjYgMTI6NTI6NTkA\
JwCaggUAAQAAAOoCAACdggUAAQAAAPICAAAiiAMAAQAAAAIAAAAniAMAAQAAAGQA\
AAAAkAcABAAAADAyMjEDkAIAFAAAAPoCAAAEkAIAFAAAAA4DAAABkQcABAAAAAEC\
AwACkQUAAQAAACIDAAABkgoAAQAAACoDAAACkgUAAQAAADIDAAAEkgoAAQAAADoD\
AAAFkgUAAQAAAEIDAAAGkgUAAQAAAEoDAAAHkgMAAQAAAAIAAAAIkgMAAQAAAAAA\
AAAJkgMAAQAAABgAAAAKkgUAAQAAAFIDAAAAoAcABAAAADAxMDABoAMAAQAAAAEA\
AAACoAkAAQAAAGQAAAADoAkAAQAAAEoAAAAFoAQAAQAAAGoDAAAVogUAAQAAAFoD\
AAAXogMAAQAAAAIAAAAAowcAAQAAAAMAAAABowcAAQAAAAEAAAABpAMAAQAAAAAA\
AAACpAMAAQAAAAAAAAADpAMAAQAAAAAAAAAEpAUAAQAAAGIDAAAFpAMAAQAAACYA\
AAAGpAMAAQAAAAAAAAAHpAMAAQAAAAAAAAAIpAMAAQAAAAAAAAAJpAMAAQAAAAAA\
AAAKpAMAAQAAAAAAAAALpAcABAAAAAAAAAAMpAMAAQAAAAAAAAAAAAAACgAAAAIP\
AABuAQAAZAAAADIwMTE6MDY6MjYgMTI6NTI6NTkAMjAxMTowNjoyNiAxMjo1Mjo1\
OQByqTkAAGAeAHfe//8Y/P//dwEAAGQAAAAAAAAAIAAAAHcBAABkAAAAAAAAAAAA\
AACaAQAAZAAAAAAAAAAAAAAA9gQAAAAEAAACAAEAAgAEAAAAUjk4AAIABwAEAAAA\
MDEwMAAAAAAGAAMBAwABAAAABgAAABoBBQABAAAA1gMAABsBBQABAAAA3gMAACgB\
AwABAAAAAgAAAAECBAABAAAA5gMAAAICBAABAAAA2woAAAAAAABIAAAAAQAAAEgA\
AAABAAAA/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQN\
DAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/\
2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy\
MjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABeAIADASIAAhEBAxEB/8QAHwAAAQUB\
AQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQID\
AAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0\
NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKT\
lJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl\
5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL\
/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHB\
CSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpj\
ZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3\
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\
6knNY+qTEzbewP8AhUOKlo0RUk2tTrI/iFrBbLXIx/uVKfGeoz/evZFI9OK4FXyy\
j0rQt9uMvR9Xpfyo522dPJr+qMM/bpSPUNVOTVLuXIkuZW+rVXguUj6Dr702dY8F\
4z9R6VEqEYq6Rm0xzXUxyfMc+vNQtO3941GFLBssAKiI96lJE3PS/FNlZaHbLJHJ\
JNNI2ApAAA78157cz3U2eMLnP3q3bm4aVN0rM4U4G45rn7mZ5nILELnoOK2oUvZQ\
s3dm7a6FZ7iSHiRcr6g1A10DIeOMVHdoyAsrnHoTVMSk4rQRcd8jFQFty47igMSv\
40n8ZoA19Put1t5Z+8vFWI7tUJDrmsKKZoJ1KngnkVsSJ5hBHFI2hK6JpbhW5UEA\
VgXEvmzMx9a1Lw+VbceorFY9TQkTUfQVDglverKz1U/gp8Q3SgVRkacb55JxVuAj\
t6VDDGOpANWgAcAcU7CIZF+fk45pGUg8dDU86okaswJOKhiVnUkH7tcclaTRnY//\
2QD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIs\
IxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIy\
MjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAAR\
CABKAGQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL\
/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0Kx\
wRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNk\
ZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5\
usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEB\
AQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAEC\
AxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygp\
KjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImK\
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\
=3S6M\
-----END PGP PUBLIC KEY BLOCK-----";

exports.test125Octets = function(test) {
	var vals = [ 0 , 10, 112, 192, 2051, 8383, 8384, 9102134 ];
	test.expect(vals.length*2);
	vals.forEach(function(it) {
		var bin = pgp.basicTypes.encode125OctetNumber(it);
		pgp.basicTypes.read125OctetNumber(bin, function(err, number) {
			test.ifError(err);
			test.equal(number, it);
		});
	});
	test.done();
};

exports.oldHeaders = function(test) {
	var tag = 10;
	var bodyLengths = [ 0 , 10, 112, 192, 2051, 8383, 8384, 9102134 ];
	test.expect(bodyLengths.length*4);
	bodyLengths.forEach(function(it) {
		var header = pgp.packets.generateOldHeader(tag, it);
		pgp.packets.getHeaderInfo(header, function(err, tag1, packetLength, header1) {
			test.ifError(err);
			
			test.equals(tag1, tag);
			test.equals(packetLength, it);
			test.equals(header1.toString(), header.toString());
		});
	});
	test.done();
};

exports.newHeaders = function(test) {
	var tag = 10;
	var bodyLengths = [ 0 , 10, 112, 192, 2051, 8383, 8384, 9102134 ];
	test.expect(bodyLengths.length*4);
	bodyLengths.forEach(function(it) {
		var header = pgp.packets.generateNewHeader(tag, it);
		pgp.packets.getHeaderInfo(header, function(err, tag1, packetLength, header1) {
			test.ifError(err);
			
			test.equals(tag1, tag);
			test.equals(packetLength, it);
			test.equals(header1.toString(), header.toString());
		});
	});
	test.done();
};

exports.key1 = function(test) {
	test.expect(27);
	
	var key = null, id = null, sig = null;

	pgp.packets.gpgsplit(new Buffer(TESTKEY1, "binary"), function(err, tag, header, body, next) {
		test.ifError(err);
		
		if(key == null)
			key = body;
		else if(id == null)
			id = body;
		else
			sig = body;

		next();
	}, function() {
		pgp.packetContent.getPublicKeyPacketInfo(key, function(err, info) {
			test.ifError(err);

			test.equals(info.version, 4);
			test.equals(info.pkalgo, 17);
			test.equals(info.date.getTime(), 1347893148000);
			test.equals(info.expires, null);
			test.equals(info.id, "3B4385AD77124641");
			
			pgp.packetContent.getIdentityPacketInfo(id, function(err, info) {
				test.ifError(err);
				
				test.equals(info.name, "blablabla");
				test.equals(info.id, "blablabla <bla@example.com>");
				test.equals(info.comment, null);
				test.equals(info.email, "bla@example.com");

				pgp.packetContent.getSignaturePacketInfo(sig, function(err, info) {
					test.ifError(err);

					test.equals(info.date.getTime(), 1347919652000);
					test.equals(info.pkalgo, 17);
					test.equals(info.version, 4);
					test.equals(info.hashalgo, 2);
					test.ok(info.hashedSubPackets[pgp.consts.SIGSUBPKT.KEY_FLAGS][0].value[pgp.consts.KEYFLAG.CERT]);
					test.ok(info.hashedSubPackets[pgp.consts.SIGSUBPKT.KEY_FLAGS][0].value[pgp.consts.KEYFLAG.SIGN]);
					test.equals(info.issuer, "3B4385AD77124641");
					test.equals(info.hashedSubPackets[pgp.consts.SIGSUBPKT.KEY_EXPIRE][0].value, 717704);
					
					pgp.signing.verifyIdentitySignature(key, id, sig, null, function(err, valid) {
						test.ifError(err);
						test.ok(valid);
						
						var forgedId = new Buffer(id.length);
						id.copy(forgedId);
						forgedId.writeUInt8(90, 0);
						pgp.signing.verifyIdentitySignature(key, forgedId, sig, null, function(err, valid) {
							test.ifError(err);
							test.ok(!valid);

							test.done();
						});
					});
				});
			});
		});
	});
};