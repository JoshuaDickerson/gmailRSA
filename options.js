var key;
function createKey(){
	var f=$('#rsame');
	// var index=$('#selKeySize').val();
	var keySize=Number($('#selKeySize').val());
	// alert(keySize);
	if(keySize==128){
		setMaxDigits(19);
		key=new RSAKeyPair("10001","202700adbd85e2d7182720c3a0ee19c1","30db31542ace0f7d37a629ee5eba28cb");
	}else if(keySize==256){
		setMaxDigits(38);
		key=new RSAKeyPair("10001","8064edb1f26944f6bec2b68789db7ffd08b074d0953b76feca71dc8265c60e9","2687f5ac6c70f9cab32fcbded7059502f4c7cc95fc3e09a560c68975ac4bf5e3");
	}else if(keySize==512){
		setMaxDigits(76);
		key=new RSAKeyPair("10001","59fed719f8959a468de367f77a33a7536d53b8e4d25ed49ccc89a94cd6899da90415623fb73386e9635034fb65ad5f248445a1c66703f760d64a8271ad342b1","8de7066f67be16fcacd05d319b6729cd85fe698c07cec504776146eb7a041d9e3cacbf0fcd86441981c0083eed1f8f1b18393f0b186e47ce1b7b4981417b491");
	}else if(keySize==1024){
		setMaxDigits(130);
		key=new RSAKeyPair("10001","12e8da920d4599458e84ec5ef1656161807f427d05eb79182b7418259d6f6c14364d1f5caf9130c8d9d9d6ea71d1bdbc87781a46a16bcb9e672814fed3b9c96ddffe0a1b0955ae68055c8f92fef518a04fc32a2ea8390e617cc5556a251f9ae9eee70a32e579cb3e9f298848a9b3aaf634f5930ffbf74473f7cb6c0cefee1751","130ebebd67b16a9ab2c53a437badbf8f01a80c750095a7fcfe95742c3d5ed1abb318babc5cb5d9350fee4da65ee074f65e1758117e6945f0fcfc8137528053ce9d1da8618890dee24e5e0bf8c87795bb1d09eddd544640824ee0dd0ea9fd908d27b0f8a1ae5c37f3647fbf2f5795500ad76c195b3387d0458a8f51b701472301");
	}else if(keySize==2048){
		setMaxDigits(260);
		key=new RSAKeyPair("10001","409c6fe2b6474762b5c07f4e55ef80d174814dc1fb0fb58e979691116fb3dc433f759ff8a88d1a0f0666862b0b3758c54b7355fa87ee827369381e1f97c5d74944e032c7186b51a956fb49d6deb3aee0b2c7e65fc53bfd46d217764850667ed0363de143f3f3d06d5a0018693ad3dacdf78a18d037ceeccb7508776f27b30852b8b505666a8dca5bfbb455d2f85918f8b5295061c97673c78802c5f5cf4581c7215dc32af8dfb6fc10e9ba51fb5a88abab94157ccecf615e104a91a45e9bee072fe7b388344c1bbad4a8f7d5daeccbadf778d59eff2a491a067bba5343c5a094c61b575fe367ecfcc01c3d208c2f8c05b9496a929b2b72e70160d07d07f248f1","9800012b1e533c2c28187424e1289fd4f7fe67487058f5ac7f27f18476c6c93db20b6d2c63d04ff310c1e7211cf8014adc006176529abc53fd1780274fc2629cf51d627c7465c3cbf4f110c3560e2128b97c4ea8a431f0b2a326fc31899790515ad45874ca75c68ee6695558736490ea895d598b8525bccab3156104d360b115ae25e99e9d899a2219136bad0336eeee0c6d725aa9c3b6b923c1ad95a9057b9deb7b563e05614acc800d9d8ec5de405d74feea722c5146feb80829508180ab5c80bf792b83f07c04c73ce0b3cf0d9f74aa92a4704819d103e58f5d4b8ca750148ba1cbab8eb55f92775b18da427c3a0b592809f3853274841a44b7129ec6a623");
	}
	return key;
}
function bodyLoad(){
	var f=$('#rsame');
	key = createKey();
	console.log(key);
	localStorage['rsakey'] = key;
	// f.selRadix.selectedIndex=key.radix-2;
}
function cmdShowKeyClick(){
	// alert("hello");
	var m=biToString(key.m,key.radix);
	var e=biToString(key.e,key.radix);
	var d=biToString(key.d,key.radix);
	$('#pubKeyArea').text(m);
	$('#privKeyArea').text(d);
}

function changeCiphertextRadix(oldRadix,newRadix){
	var f=document.rsame;
	var oldBlocks=f.txtCiphertext.value.split(" ");
	var newBlocks="";
	for(var i=0;i<oldBlocks.length;++i){
		var oldBlock=oldBlocks[i];
		var bi;
		if(oldRadix==16){
			bi=biFromHex(oldBlock);
		}else{
			bi=biFromString(oldBlock,oldRadix);
		}
		var newBlock;
		if(newRadix==16){
			newBlock=biToHex(bi);
		}else{
			newBlock=biToString(bi,newRadix);
		}
		newBlocks+=newBlock+" ";
	}
	newBlocks=newBlocks.substring(0,newBlocks.length-1);
	f.txtCiphertext.value=newBlocks;
}
function selKeySizeChange(){
	var f=document.rsame;
	f.txtCiphertext.value="";
	createKey();
}
function selRadixChange(){
	var f=document.rsame;
	var index=f.selRadix.selectedIndex;
	var newRadix=Number(f.selRadix.options[index].value);
	if(f.txtCiphertext.value!=""){
		changeCiphertextRadix(key.radix,newRadix);
	}
	key.radix=newRadix;
}

$(document).ready(function(){
	bodyLoad();
	$('#keygenButton').click(function(){
		cmdShowKeyClick();
	});
});