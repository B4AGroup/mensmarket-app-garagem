/**
 * Created by lmiranda on 3/8/16.
 */
function SettingsController($scope, $state, $ionicPopover, $ionicHistory, $ionicModal, ClientService) {
    var $this = this;

    this.scope = $scope;
    this.state = $state;
    this.history = $ionicHistory;
    this.clientService = ClientService;
}

SettingsController.prototype.openMyGarageMenu = function ($event) {
    this.popover.show($event);
};

SettingsController.prototype.openInfo = function () {
    this.scope.helpModal.show();
    this.popover.hide();
};

SettingsController.prototype.logout = function () {
    this.history.nextViewOptions({
        historyRoot: true
    });

    this.clientService.logout();
    this.state.go('home');
};

angular.module('garagem').controller('SettingsController', ['$scope', '$state', '$ionicPopover', '$ionicHistory', '$ionicModal', 'ClientService', SettingsController]);