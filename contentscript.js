function replaceMatchingTerm(termName) {
	var elts = document.getElementsByTagName('p');
	var safeTermName = termName.replace(/ /g, '-');
	var fullClass = safeTermName + " ml-term" 
	var spanTemplate = `<span class="${fullClass}">${termName}</span>`
	for (let e of elts) {
		e.innerHTML = e.innerHTML.replace(termName, spanTemplate)
	}
};

replaceMatchingTerm("divergence");
