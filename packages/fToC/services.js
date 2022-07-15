function parseAndNormalize(query){
	query = query.trim().replace(",", ".").toUpperCase();

	const match = query.match(/((\d+(\.\d+)?) )?([F|C]) {0,1}(TO) {0,1}([F|C])/);

	if(!match){
		return undefined;
	}

	const joints = ["TO"];

	const filteredMatch = match.filter((el) => {
		if (!el) return false;
		const lowercaseEl = el.toLowerCase();
		return (
			el != query && !el.includes(" ") && lowercaseEl != query && !joints.includes(el)
			)
	});

	let valueString, from, to;
	if(filteredMatch && filteredMatch.length){
		[valueString, from, to] = filteredMatch;
	}
	else{
		return undefined;
	}

	const value = parseFloat(valueString ?? 1);

	if(from === to){
		return undefined;
	}

	return {value, from, to};
}

function convert(conversion){
	if(conversion.from === 'C'){
		return (conversion.value * (9/5)) + 32;
	}
	else{
		return (conversion.value - 32) * (5/9);
	}
}

module.exports = { parseAndNormalize, convert };