
// var explanations = {
// 	"KL Divergence": "The KL Divergence (or Kullback-Leibler Divergence) is a way of measuring how similar one probability distribution is to another. KLD is asymmetric, which means KL(P, Q) isn't the same as KL(Q, P). Mathematically, KLD(P, Q) calculates the weighted average of the difference in log probability between P(X) and Q(X), where the weights come from the probability of X under P(X). (In other words, you're taking an expectation under P(X))",

// 	"Jenson-Shannon Divergence": "The Jenson-Shannon divergence is a similarity measure between distributions that is built in the Kullback-Leibler or KL Divergence, but that is designed to be symmetric, where the KLD of two distributions differs depends on the order of the arguments. Jenson-Shannon is calculated by creating a midpoint distribution M, that averages A and B, and then taking an average of KL(P, M) and KL(Q, M).",

// 	"Expected Value": "To calculate an expected value, you need two things: a function f(X), and a probability distribution P(X). You calculate the expectation by taking the sum (or integral, in the continuous case) of each value of f(x), multiplied by the probability P(x) under your distribution, then divided by the number of values N. You can also think of an expected value as being a weighted average of f(x), where the weights come from the probability values P(X). When you hear 'the expectation of <thing> taken over <thing>, the first is typically F(X), and the second is typically P(X)'", 

// 	"Likelihood": "The likelihood function answers the question of 'given some probability model p(x), or in the conditional case, p(y|X), how likely is the data in our sample, given that model'. Mathematically, it just means multiplying p(x) for all of our observed x together. When we're learning the parameters of a distribution, we often optimize those parameters to maximize the likelihood, that is, to make it so that the true, observed data would have has high probability under our model. (This is what Maximum Likelihood Estimation, or MLE, is.). The log likelihood is just this function, but summing the log probabilities instead of multiplying the normal probabilities; typically done to avoid really small numbers that floating points have difficulty handling "

//   var explanations = data;

//   var aliases = {
// 	"KL Divergence": ["KL divergence"], //Kullback-Leibler Divergence","Kullback-Leibler divergence",
// 	"Expected Value": ["Expectation"], 
// 	"Likelihood": ["Likelihood Function", "Log Likelihood"],
// 	"Jenson-Shannon Divergence": []
// }


function replaceMatchingTerm(termName, explanation) {
	console.log(`Checking for instances of ${termName}`)
	var elts = document.getElementsByTagName('p');
	var safeTermName = termName.replace(/ /g, '-');
	var termRegEx = new RegExp(termName, "gi");
	var fullClass = safeTermName + " ml-term";
	
	var numFound = 0; 
	function spanReplacer(match, p1, p2, p3, offset, string) {
		return `<span class="tooltip" title="${explanation}">${match}</span>`
		console.log(`${match} found`)
		}

	for (let e of elts) {
		console.log("new paragraph")
		var matchedTerms = e.textContent.match(termRegEx); 

		if (matchedTerms !== null) {
			e.innerHTML = e.textContent.replace(termRegEx, spanReplacer);
			numFound += 1; 

			
		}
		
	}
	return numFound;
};


var explanations_url = chrome.extension.getURL('explanations.json');
var aliases_url = chrome.extension.getURL('aliases.json');
 $.getJSON(explanations_url, function(explanations) {
 	
 	$.getJSON(aliases_url, function(aliases) {
 		chrome.storage.sync.set({"num_keys_found":0})

 		var numKeysFound = 0; 
 		var keysFound = []; 
 		for (var key in explanations) {
			var explanation_text = explanations[key]
			var num_aliases = aliases[key].length
			var numFoundKey = 0; 
			for (var i = 0; i < num_aliases; i++) {

				numFoundKey += replaceMatchingTerm(aliases[key][i], explanation_text);
			}
			numFoundKey += replaceMatchingTerm(key, explanation_text);
			if (numFoundKey > 0) {
				keysFound.push(key); 
				numKeysFound += 1; 
			}
		} 

		Tipped.create('.tooltip', {close: true, 
								   hideAfter: 1000,
								   showDelay: 400,
								  // hideOn: false, 
								   maxWidth: 400});

		var keysAndExplanations = {}
		var arrayLength = keysFound.length;
		for (var i = 0; i < arrayLength; i++) {
			key = keysFound[i]
			keysAndExplanations[key] = explanations[key]
		}
		chrome.storage.sync.set({"num_keys_found":numKeysFound}, function() {
			console.log(`${numKeysFound} keys found on page`)
		})

		chrome.storage.sync.set({"keysAndExplanations": keysAndExplanations}, function() {
			console.log("Keys and explanations:")
			console.log(keysAndExplanations)
		})


 	})

 })


 
// chrome.storage.sync.set / get 
// chrome.storage.onChanged
// changes, key 





// }
// new jBox('Tooltip', {
//   attach: '.tooltip', 
// });

// chrome.tabs.executeScript(null, {file: "tipped.js"}, function(){
//    Tipped.create('.tipped-tooltip', "test tooltip");
// });





