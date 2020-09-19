export default class HomeController {
	constructor($log) {
		'ngInject';

		this.$log = $log;
	}

	$onInit = () => {
		this.heading = 'Products';
		this.$log.info('Activated Home View.');
	};
}
