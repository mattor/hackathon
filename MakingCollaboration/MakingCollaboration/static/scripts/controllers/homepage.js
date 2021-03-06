webApp.controller('HomepageController', ['$scope', '$modal', 'CollaborationFactory', function($scope, $modal, CollaborationFactory){
	var languagesDummy = {"Python":10356,"Shell":5434,"JavaScript":2530654,"ASP":2074789,"C#":1410261,"CSS":696805,"HTML":363671,"XSLT":21945,"PHP":684040,"Smarty":4769,"TypeScript":12616,"Perl":7731,"Ruby":510,"CoffeeScript":22732};

	$scope.open = function(){
		$modal.open({
			templateUrl: 'myModalContent.html',
			controller: ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {

				$scope.items = items;
				$scope.selected = {
					item: $scope.items[0]
				};

				$scope.ok = function () {
					$modalInstance.close($scope.selected.item);
				};

				$scope.cancel = function () {
					$modalInstance.dismiss('cancel');
				};
			}],
			size: 'sm',
			resolve: {
				items: function () {
					return $scope.items;
				}
			}
		}).result.then(function (selectedItem) {
			$scope.selected = {fruit: selectedItem}
		}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
	};

	$scope.chartClicked = function() {
		console.log('chartClicked');
		$scope.showCategoryUsed = true;
	};

	$scope.chart2Clicked = function() {
		$scope.showJavascript = true;
	};

	CollaborationFactory.getCategory('JavaScript').then(function (result) {
		$scope.category = result.data;
	});

	function mapLanguages(d) {
		var labels = [],
			data = [];

		for (var key in d) {
			if (d.hasOwnProperty(key)) {
				labels.push(key);
				data.push(d[key]);
			}
		}

		return {
			labels: labels,
			data: data
		};
	}
	
	CollaborationFactory.getLanguages().then(
		function (result) {
			try {
				$scope.languages = mapLanguages(JSON.parse(result.data));
			} catch (e) {
				$scope.languages = mapLanguages(languagesDummy);
			}
			console.log($scope.languages);
		},
		function () {
			$scope.languages = mapLanguages(languagesDummy);
			console.log($scope.languages);
		}
	);
	
	//$scope.open();
}]);
