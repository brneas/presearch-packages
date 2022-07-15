'use strict';
const {parseAndNormalize, convert} = require('./services');

async function fToC(query, API_KEY) {
	const conversion = parseAndNormalize(query);
	if(!conversion){
		return undefined;
	}

	const converted = convert(conversion);

	return `
	<div id="presearchPackage">
		<div id="fToC">
			<div class="from"><span></span><i> &asymp;</i></div>
			<div class="to"><span></span></div>
		</div>
	</div>
	<style>
	.to {
		font-size: x-large;
	}
	.from {
		color: grey;
	}
	.dark #fToC {
		color: white;
	}
	@media only screen and (max-width:400px) {
		.to.shrink {
			font-size: large;
			margin-bottom: 2px;
		}
	}
	</style>
	<script>
	const mxFr2 = new Intl.NumberFormat("en", { maximumFractionDigits: 2});
	const from = document.querySelector(".from span");
	const to = document.querySelector(".to span");
	if (from) {
		from.innerHTML = "${conversion.value} ${conversion.from}";
	}
	if (to) {
		to.innerHTML = mxFr2.format(${converted}) + " ${conversion.to}";
	}
	</script>
	`;
}

async function trigger(query) {
	return parseAndNormalize(query) !== undefined;
}

module.exports = { fToC, trigger };