// for loading styles we need to load main scss file
import styles from './styles/styles.scss';

// loading shared module
import './services/core.module';
// loading all module components
import './app.components';

const appModule = angular
	.module('angularjs-es6-starter-kit', [
		// shared module
		'app.core',
		// 3rd party modules
		'ui.router',
		'ui.bootstrap',
		// application specific modules
		'app.header',
		'app.home'
	]);

	appModule.controller('ProductsController', ['$scope', '$http', '$log', '$sce', function ($scope, $http, $log, $sce) {
		$scope.myInterval = 5000;
		$scope.noWrapSlides = false;
		$scope.active = 0;
		$scope.title = '';
		$scope.products = [];

		$scope.toggleCarousel = (product) => {
			product.isToggled = !product.isToggled;
			const $el = angular.element(document.getElementById(product.id + '_carousel'));
			if (product.isToggled) {
				$el.removeClass('hidden');
			} else {
				$el.addClass('hidden');
			}

			$log.info('product: ', product, '$el: ', $el);
		};

		//get/parse JSON here:
		const url = './services/index.json';
		$http({
			method: 'GET',
			url: url
		}).then((response) => {
			if (response && response.data) {
				$scope.title = response.data.name ? response.data.name : '';
				_.forEach(response.data.groups, (product) => {
					product.name = $sce.trustAsHtml(product.name);
					product.isToggled = false;
					product.slides = [];
					let currIndex = 0;

					_.forEach(product.images, (image) => {
						product.slides.push({
							image: image.href,
							text: '',
							id: currIndex++
						});
					});

					$scope.products.push(product);
				});

				$log.info('successCallback - response: ', response, 'products: ', $scope.products);
			}
		}, (response) => {
			$log.info('error getting products - response: ', response);
		});
	}
]);

export default appModule;
