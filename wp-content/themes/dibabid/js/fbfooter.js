/*jshint multistr:true */
'use strict';


angular.module('FasbidClient')
        .directive('fbfooter', ['Dataservice', '$location', 'afns', '$modal',
            function(Dataservice, $location, afns, $modal) {
                return {
                    templateUrl: $location.protocol() + '://' + $location.host()+'/auctions/templates/botnav.html',
                    restrict: 'A',
                    scope: {
                        isopen: '=isopen'
                    },
                    link: function(scope) {


                        scope.hasUser = function() {
                            return !!Dataservice.getUser();
                        };
                        scope.showRegistration = function() {
                            var registration = $modal.open({
                                templateUrl: 'views/register.html',
                                controller: 'RegisterCtrl',
                                keyboard: false,
                                backdrop: 'static',
                            });

                            registration.result.then(function() {
                            }, function() {
                            });
                        };


                        scope.showCredits = function() {
                            var buyCredits = $modal.open({
                                templateUrl: 'templates/buycreditsnew.html',
                                windowClass: 'modal fade',
                                controller: 'BuyCreditsCtrl',
                                backdrop: 'static',
                                keyboard: false,
                                resolve: {
                                    abalance: function() {
                                        return Dataservice.getCredits();
                                    },
                                    auction: function() {
                                        return {'tokenType':true,'Exange':false};
									},
                                    hideTitle: function() {
                                        return true;
                                    },
                                }
                            });


                            buyCredits.result.then(
                                    function() {
                                        console.log('Buy credits ok.');
                                    }, function() {
                                console.log('Buy credits bad');
                            });



                        };

                    }
                };
            }]);
