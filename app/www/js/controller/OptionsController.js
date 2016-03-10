/**
 * Created by lmiranda on 3/8/16.
 */
function OptionsController($scope, $state, $ionicPopover, ClientService) {
    var $this = this;

    this.scope = $scope;
    this.state = $state;
    this.clientService = ClientService;

    $ionicPopover.fromTemplateUrl('my-garage-popover.html', {
        scope: $scope
    }).then(function (popover) {
        $this.popover = popover;
    });
}

OptionsController.prototype.openMyGarageMenu = function ($event) {
    this.popover.show($event);
};

OptionsController.prototype.openInfo = function () {
    alert('Info');
};

OptionsController.prototype.logout = function () {
    this.popover.hide();
    this.clientService.logout();
    this.state.go('home');
};

angular.module('garagem').controller('OptionsController', ['$scope', '$state', '$ionicPopover', 'ClientService', OptionsController]);